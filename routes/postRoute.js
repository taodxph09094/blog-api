const express = require("express");
const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.route("/posts").get(getAllPost);
router.route("/post/new").post(createPost);
router.route("/post/:id").put(updatePost).delete(deletePost);

module.exports = router;
