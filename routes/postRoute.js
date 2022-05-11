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
  .get(isAuthenticatedUser, authorizeRoles("admin", "user"), getAdminPosts);

router
  .route("/post/new")
  .post(isAuthenticatedUser, authorizeRoles("admin", "user"), createPost);
router
  .route("/post/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "user"), updatePost)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "user"), deletePost)
  .get(isAuthenticatedUser, getProductDetails);

// router.route("/review").put(isAuthenticatedUser, createProductReview);

// router
//   .route("/reviews")
//   .get(getProductReviews)
//   .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
