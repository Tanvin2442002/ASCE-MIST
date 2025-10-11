const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");

// GET /committees/years - get all available years (MUST be before /committees route)
router.get("/committees/years", async (req, res) => {
  try {
    const years = await sql`
      SELECT DISTINCT panel_year
      FROM public.committee_images
      WHERE panel_year IS NOT NULL
      ORDER BY panel_year DESC
    `;
    
    res.status(200).json(years.map(row => row.panel_year));
  } catch (error) {
    console.error("Error fetching committee years:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/committees", async (req, res) => {
  try {
    const { year } = req.query;
    
    let committees;
    if (year) {
      // Filter by specific year
      committees = await sql`
        SELECT
          id,
          image_url,
          panel_year
        FROM public.committee_images
        WHERE panel_year = ${year}
        ORDER BY id
      `;
    } else {
      // Get all committees with their years
      committees = await sql`
        SELECT
          id,
          image_url,
          panel_year
        FROM public.committee_images
        ORDER BY panel_year DESC, id
      `;
    }

    res.status(200).json(committees);
  } catch (error) {
    console.error("Error fetching committees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;