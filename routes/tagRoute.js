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
  .route("tag/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTag)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTag)
  .get(isAuthenticatedUser, getTagDetails);
module.exports = router;
