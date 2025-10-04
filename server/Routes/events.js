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

router.post(
  "/events",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "group_image", maxCount: 1 },
    { name: "activities_image", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      title,
      date,
      location,
      type,
      description,
      full_description,
      highlights,
      organizers,
    } = req.body;

    try {
      // Upload helper
      const uploadFile = async (file, prefix) => {
        const ext = file.originalname.split(".").pop();
        const fileName = `${prefix}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("events")
          .upload(fileName, file.buffer, { contentType: file.mimetype });

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("events")
          .getPublicUrl(fileName);

        return publicData.publicUrl;
      };

      // Handle image uploads
      let imageUrl = null,
        groupImageUrl = null,
        activitiesImageUrl = null;

      if (req.files["image"] && req.files["image"][0]) {
        imageUrl = await uploadFile(req.files["image"][0], "main");
      }
      if (req.files["group_image"] && req.files["group_image"][0]) {
        groupImageUrl = await uploadFile(req.files["group_image"][0], "group");
      }
      if (req.files["activities_image"] && req.files["activities_image"][0]) {
        activitiesImageUrl = await uploadFile(
          req.files["activities_image"][0],
          "activities"
        );
      }

      // Parse arrays
      let parsedHighlights = null;
      if (highlights) {
        try {
          parsedHighlights = Array.isArray(highlights)
            ? highlights
            : JSON.parse(highlights);
        } catch {
          parsedHighlights = null;
        }
      }

      let parsedOrganizers = null;
      if (organizers) {
        try {
          parsedOrganizers = Array.isArray(organizers)
            ? organizers
            : JSON.parse(organizers);
        } catch {
          parsedOrganizers = null;
        }
      }

      // Insert into DB
      const result = await sql`
        INSERT INTO public.events (
          title,
          date,
          location,
          type,
          image,
          group_image,
          activities_image,
          description,
          full_description,
          highlights,
          organizers
        ) VALUES (
          ${title},
          ${date},
          ${location},
          ${type},
          ${imageUrl},
          ${groupImageUrl},
          ${activitiesImageUrl},
          ${description},
          ${full_description},
          ${parsedHighlights},
          ${parsedOrganizers}
        )
        RETURNING *;
      `;

      res.status(201).json(result[0]);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await sql`
      SELECT
        id,
        title,
        date,
        location,
        type,
        image,
        group_image,
        activities_image,
        description,
        full_description,
        highlights,
        organizers
      FROM public.events
      ORDER BY date DESC;
    `;
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific event by ID
router.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`
      SELECT
        id,
        title,
        date,
        location,
        type,
        image,
        group_image,
        activities_image,
        description,
        full_description,
        highlights,
        organizers
      FROM public.events
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;