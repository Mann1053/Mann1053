const express = require("express");
const {
  createCase,
  getCases,
  getCaseById,
  updateCase,
  deleteCase,
} = require("../controllers/caseController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");
const { createLimiter } = require('../middlewares/rateLimitMiddleware');

const router = new express.Router();

router.post("/cases", authMiddleware, checkRole("create_case"), createCase);
router.get("/cases", authMiddleware, checkRole("view_case"), getCases);
router.get("/case/:id", authMiddleware, checkRole("view_case"), getCaseById);
router.put("/case/:id", authMiddleware, checkRole("update_case"), updateCase);
router.delete("/case/:id", authMiddleware, checkRole("delete_case"), deleteCase);

module.exports = router;