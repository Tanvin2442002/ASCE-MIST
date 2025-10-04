const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");
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

// POST /seminars - create a new seminar with up to 3 images
router.post(
  "/seminars",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "additional_images", maxCount: 2 }
  ]),
  async (req, res) => {
    const {
      title,
      date,
      time,
      speaker,
      designation,
      location,
      attendees,
      description,
      full_description,
      video_url,
      objectives // should be sent as JSON string or array
    } = req.body;

    try {
      // 1. Upload main image
      let imageUrl = null;
      if (req.files["image"] && req.files["image"][0]) {
        const file = req.files["image"][0];
        const ext = file.originalname.split(".").pop();
        const fileName = `main-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;
        const { error: uploadError } = await supabase
          .storage
          .from("seminars")
          .upload(fileName, file.buffer, { contentType: file.mimetype });
        if (uploadError) throw uploadError;
        const { data: publicData } = supabase
          .storage
          .from("seminars")
          .getPublicUrl(fileName);
        imageUrl = publicData.publicUrl;
      }

      // 2. Upload additional images
      let additionalImages = [];
      if (req.files["additional_images"]) {
        for (const [idx, file] of req.files["additional_images"].entries()) {
          const ext = file.originalname.split(".").pop();
          const fileName = `additional-${idx}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${ext}`;
          const { error: uploadError } = await supabase
            .storage
            .from("seminars")
            .upload(fileName, file.buffer, { contentType: file.mimetype });
          if (uploadError) throw uploadError;
          const { data: publicData } = supabase
            .storage
            .from("seminars")
            .getPublicUrl(fileName);
          // Optionally, you can get captions from req.body.additional_captions (array)
          additionalImages.push({
            url: publicData.publicUrl,
            caption: req.body[`additional_caption_${idx}`] || ""
          });
        }
      }

      // 3. Parse objectives if sent as JSON string
      let parsedObjectives = null;
      if (objectives) {
        try {
          parsedObjectives = Array.isArray(objectives)
            ? objectives
            : JSON.parse(objectives);
        } catch {
          parsedObjectives = null;
        }
      }

      // 4. Insert into DB
      const result = await sql`
        INSERT INTO public.seminars (
          title,
          date,
          time,
          speaker,
          designation,
          location,
          attendees,
          image,
          additional_images,
          description,
          full_description,
          video_url,
          objectives
        ) VALUES (
          ${title},
          ${date},
          ${time},
          ${speaker},
          ${designation},
          ${location},
          ${attendees ? Number(attendees) : null},
          ${imageUrl},
          ${additionalImages.length > 0 ? JSON.stringify(additionalImages) : null},
          ${description},
          ${full_description},
          ${video_url},
          ${parsedObjectives}
        )
        RETURNING *;
      `;
      res.status(201).json(result[0]);
    } catch (error) {
      console.error("Error creating seminar:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// GET /seminars - fetch all seminars
router.get("/seminars", async (req, res) => {
  try {
    const seminars = await sql`
      SELECT
        id,
        title,
        date,
        time,
        speaker,
        designation,
        location,
        attendees,
        image,
        additional_images,
        description,
        full_description,
        video_url,
        objectives
      FROM public.seminars
      ORDER BY date DESC;
    `;
    res.status(200).json(seminars);
  } catch (error) {
    console.error("Error fetching seminars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;