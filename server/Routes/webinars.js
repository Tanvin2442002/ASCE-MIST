const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Supabase client (server-side service role key)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

// Helper to upload a Buffer to Supabase and return a public URL
async function uploadBufferToSupabase(
  bucket,
  fileBuffer,
  originalName,
  mimeType
) {
  const safeName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}-${originalName.replace(/\s+/g, "_")}`;
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(safeName, fileBuffer, { contentType: mimeType });

  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(safeName);

  // Depending on Supabase SDK version, public URL lives in publicData.publicUrl
  return publicData?.publicUrl || null;
}

// POST /webinar - create a new webinar with up to 4 images
// Expected files: "image" (main), "speaker_image", "audience_image", "cover_image" (optional)
router.post(
  "/webinar",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "speaker_image", maxCount: 1 },
    { name: "audience_image", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      title,
      date,
      time,
      speaker,
      organization,
      description,
      full_description,
      objectives, // expected comma-separated string from client
      video_url,
    } = req.body;

    try {
      if (!title || !date || !time || !speaker) {
        return res.status(400).json({
          error: "Missing required fields: title, date, time, speaker",
        });
      }

      const files = req.files || {};
      // (uploading images code omitted — keep your uploadBufferToSupabase usage)
      let imageUrl = null;
      let speakerImageUrl = null;
      let audienceImageUrl = null;

      if (files["image"]?.[0]) {
        const file = files["image"][0];
        imageUrl = await uploadBufferToSupabase("webinar", file.buffer, file.originalname, file.mimetype);
      }
      if (files["speaker_image"]?.[0]) {
        const file = files["speaker_image"][0];
        speakerImageUrl = await uploadBufferToSupabase("webinar", file.buffer, file.originalname, file.mimetype);
      }
      if (files["audience_image"]?.[0]) {
        const file = files["audience_image"][0];
        audienceImageUrl = await uploadBufferToSupabase("webinar", file.buffer, file.originalname, file.mimetype);
      }
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
      const result = await sql`
        INSERT INTO public.webinars (
          title,
          date,
          time,
          speaker,
          organization,
          image,
          speaker_image,
          audience_image,
          description,
          full_description,
          objectives,
          video_url
        ) VALUES (
          ${title},
          ${date},
          ${time},
          ${speaker},
          ${organization ?? null},
          ${imageUrl ?? null},
          ${speakerImageUrl ?? null},
          ${audienceImageUrl ?? null},
          ${description ?? null},
          ${full_description ?? null},
          ${parsedObjectives},
          ${video_url ?? null}
        )
        RETURNING *;
      `;

      return res.status(201).json(result[0]);
    } catch (error) {
      console.error("Error creating webinar:", error);
      // show more info to help debugging (but remove or limit in production)
      return res.status(500).json({
        error: "Internal server error",
        details: error.message || error,
      });
    }
  }
);


router.get("/webinar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const webinar = await sql`
      SELECT
        id,
        title,
        date,
        time,
        speaker,
        organization,
        image,
        speaker_image,
        audience_image,
        description,
        full_description,
        objectives,
        video_url
      FROM public.webinars
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (webinar.length === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    // Return the first row
    res.status(200).json(webinar[0]);
  } catch (error) {
    console.error("Error fetching webinar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /webinars - fetch all webinars
router.get("/webinars", async (req, res) => {
  try {
    const webinars = await sql`
      SELECT
        id,
        title,
        date,
        time,
        speaker,
        organization,
        image,
        speaker_image,
        audience_image,
        description,
        full_description,
        objectives,
        video_url
      FROM public.webinars
      ORDER BY date DESC;
    `;
    res.status(200).json(webinars);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
