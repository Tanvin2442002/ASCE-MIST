const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

// Multer setup (store file temporarily in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY // Use service key for server-side upload
);

// GET /announcements - fetch all announcements
router.get("/announcements", async (req, res) => {
  try {
    const announcements = await sql`
      SELECT
        id,
        title,
        description,
        status,
        priority,
        image_url,
        created_at,
        updated_at
      FROM public.announcements
      ORDER BY created_at DESC;
    `;
    // console.log("Fetched announcements:", announcements);
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/announcements/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`
      SELECT
        id,
        title,
        description,
        status,
        priority,
        image_url,
        created_at,
        updated_at
      FROM public.announcements
      WHERE id = ${id}
      LIMIT 1;
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /announcements - create a new announcement with image upload
router.post("/announcements", upload.single("image"), async (req, res) => {
  const { title, description, status, priority } = req.body;
  let image_url = null;

  try {
    // 1. Upload image to Supabase if file is present
    if (req.file) {
      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error: uploadError } = await supabase
        .storage
        .from("announcement")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({ error: "Failed to upload image to Supabase" });
      }

      // Get public URL
      const { data: publicUrlData } = supabase
        .storage
        .from("announcement")
        .getPublicUrl(fileName);

      image_url = [publicUrlData.publicUrl];
    }

    // 2. Insert into DB
    const result = await sql`
      INSERT INTO public.announcements (
        title,
        description,
        status,
        priority,
        image_url,
        created_at,
        updated_at
      ) VALUES (
        ${title},
        ${description},
        ${status},
        ${priority},
        ${image_url},
        NOW(),
        NOW()
      )
      RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
