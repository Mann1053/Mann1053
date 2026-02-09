const express = require("express");
const router = express.Router();

const checkRole = require("../middlewares/checkRole");
const authMiddleware = require("../middlewares/authMiddleware");

const roleController = require("../controllers/roleController");

router.post(
  "/roles",
  authMiddleware,
  checkRole("create_role"),
  roleController.createRole
);
router.put(
  "/roles/:id",
  authMiddleware,
  checkRole("update_role"),
  roleController.updateRole
);
router.delete(
  "/roles/:id",
  authMiddleware,
  checkRole("delete_role"),
  roleController.deleteRole
);
router.get(
  "/roles",
  authMiddleware,
  checkRole("view_role"),
  roleController.getRoles
);
router.get(
  "/roles/:id",
  authMiddleware,
  checkRole("view_role"),
  roleController.getRoleById
);

module.exports = router;
