const express = require("express");
const {
  getAdminSubs,
  createSub,
  updateSub,
  deleteSub,
  getSubDetails,
} = require("../controllers/subController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/admin/subscribe")
  .get(isAuthenticatedUser, authorizeRoles("admin", "user"), getAdminSubs);
router
  .route("/subscribe/create")
  .post(isAuthenticatedUser, authorizeRoles("admin", "user"), createSub);
router
  .route("/subscribe/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSub)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSub)
  .get(isAuthenticatedUser, getSubDetails);
module.exports = router;

/**
 * @swagger
 * subscribe:
 *   name: Subscribe
 *   description: The subscribe managing API
 */

/**
 * @swagger
 * /admin/subscribe:
 *   get:
 *     summary: Returns the list of all the subscribe (admin)
 *     tags: [Subscribe]
 *     responses:
 *       200:
 *         description: The list of the subscribe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /subscribe/create:
 *   post:
 *     summary: Create subscribe (admin)
 *     tags: [Subscribe]
 *     responses:
 *       200:
 *         description: Create subscribe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /subscribe/:id:
 *   put:
 *     summary: Update subscribe (admin)
 *     tags: [Subscribe]
 *     responses:
 *       200:
 *         description: Update subscribe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /subscribe/:id:
 *   delete:
 *     summary: Delete subscribe (admin)
 *     tags: [Subscribe]
 *     responses:
 *       200:
 *         description: Delete subscribe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /subscribe/:id:
 *   get:
 *     summary: Get subscribe details (admin)
 *     tags: [Subscribe]
 *     responses:
 *       200:
 *         description: Get subscribe details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
