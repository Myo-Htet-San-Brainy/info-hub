//packages
const express = require("express");
const router = express.Router();

//imports
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  updateTrustVote,
  deleteBlog,
} = require("../controllers/blogController");

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", createBlog);
router.put("/updateTrustVote/:id", updateTrustVote);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
