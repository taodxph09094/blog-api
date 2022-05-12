const express = require("express");
const {
  getAllTags,
  getAdminTags,
  createTag,
  updateTag,
  deleteTag,
  getTagDetails,
} = require("../controllers/tagController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/tags").get(getAllTags);
router
  .route("/admin/tags")
  .get(isAuthenticatedUser, authorizeRoles("admin", "user"), getAdminTags);
router
  .route("/tag/create")
  .post(isAuthenticatedUser, authorizeRoles("admin", "user"), createTag);
router
  .route("/tag/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTag)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTag)
  .get(isAuthenticatedUser, getTagDetails);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tag
 *   description: The tag managing API
 */

/**
 * @swagger
 * /tag:
 *   get:
 *     summary: Returns the list of all the tag
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: The list of the tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /admin/tags:
 *   get:
 *     summary: Returns the list of all the tag (admin)
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: The list of the tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /tag/create:
 *   post:
 *     summary: Create tag (admin)
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: Create tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /tag/:id:
 *   put:
 *     summary: Update tag (admin)
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: Update tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /tag/:id:
 *   delete:
 *     summary: Delete tag (admin)
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: Delete tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /tag/:id:
 *   get:
 *     summary: Get tag details (admin)
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: Get tag details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
