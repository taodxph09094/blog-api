const express = require("express");
const {
  getAllCategories,
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
} = require("../controllers/categoryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/category").get(getAllCategories);
router
  .route("/admin/categories")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "user"),
    getAdminCategories
  );
router
  .route("/category/create")
  .post(isAuthenticatedUser, authorizeRoles("admin", "user"), createCategory);
router
  .route("/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory)
  .get(isAuthenticatedUser, getCategoryDetails);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The category managing API
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns the list of all the category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /admin/categories:
 *   get:
 *     summary: Returns the list of all the category (admin)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create category (admin)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Create category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /category/:id:
 *   put:
 *     summary: Update category (admin)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Update category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /category/:id:
 *   delete:
 *     summary: Delete category (admin)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Delete category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /category/:id:
 *   get:
 *     summary: Get category details (admin)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Get category details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
