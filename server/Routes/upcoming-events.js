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

router.get("/upcoming-events", async (req, res) => {
  try {
    const events = await sql`
      (
        SELECT
          id, title, date, time, organizer, location,
          category, image, description, full_description, registration_link
        FROM public.upcoming_events
        WHERE date >= CURRENT_DATE
        ORDER BY date ASC
        LIMIT 3
      )
      UNION ALL
      (
        SELECT
          id, title, date, time, organizer, location,
          category, image, description, full_description, registration_link
        FROM public.upcoming_events
        WHERE date < CURRENT_DATE
        ORDER BY date DESC
        LIMIT (
          3 - (
            SELECT COUNT(*)
            FROM public.upcoming_events
            WHERE date >= CURRENT_DATE
          )
        )
      );
    `;

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/upcoming-events/:id", async (req, res) => {
  const { id } = req.params

  try {
    const event = await sql`
      SELECT
        id,
        title,
        date,
        time,
        organizer,
        location,
        category,
        image,
        description,
        full_description,
        registration_link
      FROM public.upcoming_events
      WHERE id = ${id}
      LIMIT 1
    `

    if (!event || event.length === 0) {
      return res.status(404).json({ error: "Event not found" })
    }

    res.status(200).json(event[0])
  } catch (error) {
    console.error("Error fetching upcoming event:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router;