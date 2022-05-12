const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Register
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Login
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /password/forgot:
 *   post:
 *     summary: Forgot Password
 *     tags: [User]
 *     responses:
 *       200:
 *         description:  Forgot Password
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /password/reset/:token:
 *   put:
 *     summary: Reset Password
 *     tags: [User]
 *     responses:
 *       200:
 *         description:  Reset Password
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout
 *     tags: [User]
 *     responses:
 *       200:
 *         description:  Logout
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /me:
 *   get:
 *     summary: User detail
 *     tags: [User]
 *     responses:
 *       200:
 *         description:  User detail
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /password/update/:
 *   put:
 *     summary: Update/change password
 *     tags: [User]
 *     responses:
 *       200:
 *         description:  Update/change password
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /me/update/:
 *   put:
 *     summary: Update profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description:  Update profile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Returns the list of all the user (admin)
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /admin/user/:id:
 *   get:
 *     summary: Single user (admin)
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Single user (admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /admin/user/:id:
 *   put:
 *     summary: Update user role (admin)
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Update user role (admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /admin/user/:id:
 *   delete:
 *     summary: Delete user (admin)
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Delete user (admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
