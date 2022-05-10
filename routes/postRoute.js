const express = require("express");
const {
  getAllPosts,
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
  getProductDetails,
} = require("../controllers/postController");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/posts").get(getAllPosts);
// router.route("/admin/products");
// .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminPosts);
router.route("/post/new").post(createPost);
router
  .route("/post/:id")
  .put(updatePost)
  .delete(deletePost)
  .get(getProductDetails);

module.exports = router;
