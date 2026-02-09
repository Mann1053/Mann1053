const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

const rolePermissionController = require("../controllers/rolePermissionController");

router.post(
  "/role-permissions",
  authMiddleware,
  checkRole("create_role"),
  rolePermissionController.assignPermissionsToRole
);
router.put(
  "/role-permissions",
  authMiddleware,
  checkRole("update_role"),
  rolePermissionController.updatePermissionsOfRole
);

module.exports = router;
