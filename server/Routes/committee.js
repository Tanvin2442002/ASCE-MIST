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

// GET /committees/types/:year - get available panel types for a specific year
router.get("/committees/types/:year", async (req, res) => {
  try {
    const { year } = req.params;
    const types = await sql`
      SELECT DISTINCT panel_type
      FROM public.committee_images
      WHERE panel_year = ${year} AND panel_type IS NOT NULL
      ORDER BY panel_type
    `;
    
    res.status(200).json(types.map(row => row.panel_type));
  } catch (error) {
    console.error("Error fetching committee types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/committees", async (req, res) => {
  try {
    const { year, type } = req.query;
    
    let committees;
    if (year && type) {
      // Filter by both year and panel type
      committees = await sql`
        SELECT
          id,
          image_url,
          panel_year,
          panel_type
        FROM public.committee_images
        WHERE panel_year = ${year} AND panel_type = ${type}
        ORDER BY id
      `;
    } else if (year) {
      // Filter by year only (default to presidential if no type specified)
      committees = await sql`
        SELECT
          id,
          image_url,
          panel_year,
          panel_type
        FROM public.committee_images
        WHERE panel_year = ${year}
        ORDER BY panel_type, id
      `;
    } else {
      // Get all committees with their years and types
      committees = await sql`
        SELECT
          id,
          image_url,
          panel_year,
          panel_type
        FROM public.committee_images
        ORDER BY panel_year DESC, panel_type, id
      `;
    }

    res.status(200).json(committees);
  } catch (error) {
    console.error("Error fetching committees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;