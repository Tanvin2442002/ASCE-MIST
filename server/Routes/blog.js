const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");

// GET /blogs - fetch all blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await sql`
      SELECT
        id,
        title,
        excerpt,
        content,
        category,
        status,
        featured_image,
        images,
        author,
        created_at,
        updated_at
      FROM public.blogs
      ORDER BY created_at DESC;
    `;
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
