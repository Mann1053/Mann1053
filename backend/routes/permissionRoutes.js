const express = require("express");
const router = express.Router();

const checkRole = require("../middlewares/checkRole");
const authMiddleware = require("../middlewares/authMiddleware");

const permissionController = require("../controllers/permissionController");

router.post(
  "/permissions",
  authMiddleware,
  checkRole("create_permission"),
  permissionController.createPermission
);
router.put(
  "/permissions/:id",
  authMiddleware,
  checkRole("update_permission"),
  permissionController.updatePermission
);
router.delete(
  "/permissions/:id",
  authMiddleware,
  checkRole("delete_permission"),
  permissionController.deletePermission
);
router.get(
  "/permissions",
  authMiddleware,
  checkRole("view_permission"),
  permissionController.getPermissions
);
router.get(
  "/permissions/:id",
  authMiddleware,
  checkRole("view_permission"),
  permissionController.getPermissionById
);

module.exports = router;
