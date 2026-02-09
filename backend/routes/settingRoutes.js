const express = require("express");
const { getSettings, createSettings, updateSetting, deleteSetting } = require("../controllers/settingController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

const router = new express.Router();

router.get("/settings", authMiddleware, checkRole("view_setting"), getSettings);
router.post("/settings", authMiddleware, checkRole("create_setting"), createSettings);
router.put("/setting/:id", authMiddleware, checkRole("update_setting"), updateSetting);
router.delete("/setting/:id", authMiddleware, checkRole("delete_setting"), deleteSetting);

module.exports = router;