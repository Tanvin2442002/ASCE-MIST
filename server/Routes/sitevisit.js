const express = require("express");
const router = express.Router();
const sql = require("../DB/connection"); // adjust if path differs
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();


const storage = multer.memoryStorage();
const upload = multer({ storage });

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

// POST /site-visits - create site visit, optionally upload up to 3 images
router.post(
  "/site-visits/upload",
  upload.array("images", 3),
  async (req, res) => {
    try {
      const {
        title,
        location,
        description,
        highlights,
        learning_outcomes,
        visit_date,
        duration,
        max_participants,
        category,
        status,
      } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json({ error: "title and description are required" });
      }

      const files = req.files || [];
      const imageUrls = [];

      for (const file of files) {
        const safeName = `${Date.now()}-${file.originalname}`.replace(
          /\s+/g,
          "-"
        );
        const filePath = safeName;

        const { error: uploadError } = await supabase.storage
          .from("site-visits")
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (uploadError) {
          console.error("Supabase upload error:", uploadError);
          return res.status(500).json({ error: "Failed to upload image" });
        }

        const { data } = supabase.storage
          .from("site-visits")
          .getPublicUrl(filePath);
        const publicUrl = data?.publicUrl || null;
        if (publicUrl) imageUrls.push(publicUrl);
      }

      console.log("DEBUG imageUrls:", imageUrls);

      // Convert JS array to PostgreSQL array literal
      const imageArrayParam =
        imageUrls.length > 0
          ? `{${imageUrls.map((url) => `"${url.replace(/"/g, '\\"')}"`).join(',')}}`
          : '{}';

      // Insert into database
      const inserted = await sql`
  INSERT INTO public.site_visits (
    title,
    location,
    description,
    highlights,
    learning_outcomes,
    visit_date,
    duration,
    max_participants,
    category,
    status,
    image_urls
  ) VALUES (
    ${title},
    ${location || null},
    ${description},
    ${highlights || null},
    ${learning_outcomes || null},
    ${visit_date ? new Date(visit_date) : null},
    ${duration || null},
    ${max_participants ? Number(max_participants) : null},
    ${category || null},
    ${status || "draft"},
    ${imageArrayParam}
  ) RETURNING *;
`;
  console.log("Inserted site visit:", inserted);
      res.status(201).json(inserted);
    } catch (error) {
      console.error("Error creating site visit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


// GET /site-visits - fetch all site visits
router.get("/site-visits", async (req, res) => {
  try {
    const siteVisits = await sql`
      SELECT
        id,
        title,
        location,
        description,
        highlights,
        learning_outcomes,
        visit_date,
        duration,
        max_participants,
        category,
        status,
        image_urls,
        created_at,
        updated_at
      FROM public.site_visits
      ORDER BY visit_date DESC NULLS LAST, created_at DESC;
    `;

    // siteVisits is expected to be an array of rows
    res.status(200).json(siteVisits);
  } catch (error) {
    console.error("Error fetching site visits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /site-visits/:id - fetch single site visit by id
router.get("/site-visits/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing site visit id" });
    }

    // If you want a simple UUID format check (optional)
    // const uuidRegex = /^[0-9a-fA-F-]{36}$/
    // if (!uuidRegex.test(id)) {
    //   // Not a strict UUID validation, but catches obvious bad input
    //   console.warn("Invalid id format:", id)
    //   // continue — you can also return 400 if you prefer
    // }

    const rows = await sql`
      SELECT
        id,
        title,
        location,
        description,
        highlights,
        learning_outcomes,
        visit_date,
        duration,
        max_participants,
        category,
        status,
        image_urls,
        created_at,
        updated_at
      FROM public.site_visits
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Site visit not found" });
    }

    const siteVisit = rows[0];
    res.status(200).json(siteVisit);
  } catch (error) {
    console.error("Error fetching site visit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
