const express = require("express");
const {
  getAllPosts,
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
  getProductDetails,
} = require("../controllers/postController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/posts").get(getAllPosts);
router
  .route("/admin/posts")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminPosts);
// router.route("/admin/products");
// .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminPosts);
router.route("/post/new").post(isAuthenticatedUser, createPost);
router
  .route("/post/:id")
  .put(isAuthenticatedUser, updatePost)
  .delete(isAuthenticatedUser, deletePost)
  .get(isAuthenticatedUser, getProductDetails);

module.exports = router;
