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
  .route("category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory)
  .get(isAuthenticatedUser, getCategoryDetails);
module.exports = router;
