const express = require("express");
const {
  getAllPosts,
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
  getPostDetails,
  createPostReview,
  getPostReviews,
  deleteReview
} = require("../controllers/postController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/post").get(getAllPosts);

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
  .get(getPostDetails);

router.route("/review").put(isAuthenticatedUser, createPostReview);

router
  .route("/reviews")
  .get(getPostReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The post managing API
 */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Returns the list of all the post
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: The list of the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /post/:id:
 *   put:
 *     summary: Update post (admin)
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Update post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /post/:id:
 *   delete:
 *     summary: Delete post (admin)
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Delete post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /post/:id:
 *   get:
 *     summary: Get post details (admin)
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Get post details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
/**
 * @swagger
 * /admin/posts:
 *   get:
 *     summary: Returns the list of all the post (admin)
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: The list of the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /post/new:
 *   post:
 *     summary: Create post (admin)
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Create post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
