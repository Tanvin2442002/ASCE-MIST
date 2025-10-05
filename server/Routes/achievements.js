const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");

// GET all achievements
router.get("/achievements", async (req, res) => {
  try {
    const achievements = await sql`
      SELECT
        id,
        title,
        category,
        date,
        description,
        image,
        awarded_by,
        level,
        details,
        criteria,
        impact,
        additional_images
      FROM public.achievements
      ORDER BY date DESC;
    `;

    res.status(200).json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/achievements/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Query for the specific achievement (UUID-safe)
    const achievement = await sql`
      SELECT
        id,
        title,
        category,
        date,
        description,
        image,
        awarded_by,
        level,
        details,
        criteria,
        impact,
        additional_images
      FROM public.achievements
      WHERE id = ${id};
    `;

    if (achievement.length === 0) {
      return res.status(404).json({ error: "Achievement not found" });
    }

    res.status(200).json(achievement[0]);
  } catch (error) {
    console.error("Error fetching achievement by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
