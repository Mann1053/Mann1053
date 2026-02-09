const express = require("express");
const router = express.Router();

const checkRole = require("../middlewares/checkRole");
const authMiddleware = require("../middlewares/authMiddleware");

const templateController = require("../controllers/templateController");

router.post(
  "/templates",
  authMiddleware,
  checkRole("create_template"),
  templateController.createTemplate
);
router.put(
  "/templates/:id",
  authMiddleware,
  checkRole("update_template"),
  templateController.updateTemplate
);
router.delete(
  "/templates/:id",
  authMiddleware,
  checkRole("delete_template"),
  templateController.deleteTemplate
);
router.get(
  "/templates",
  authMiddleware,
  checkRole("view_template"),
  templateController.getTemplates
);
router.get(
  "/templates/:id",
  authMiddleware,
  checkRole("view_template"),
  templateController.getTemplateById
);

module.exports = router;
