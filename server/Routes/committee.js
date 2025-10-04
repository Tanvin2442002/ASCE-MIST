const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");


router.get("/committees", async (req, res) => {
  try {
    const committees = await sql`
      SELECT
        id,
        image_url
      FROM public.committee_images
    `;

    res.status(200).json(committees);
  } catch (error) {
    console.error("Error fetching committees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;