const express = require("express");
const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getProductDetails,
} = require("../controllers/postController");

const router = express.Router();

router.route("/posts").get(getAllPost);
router.route("/post/new").post(createPost);
router
  .route("/post/:id")
  .put(updatePost)
  .delete(deletePost)
  .get(getProductDetails);

module.exports = router;
