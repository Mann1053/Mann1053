const express = require("express");
const { getSDRList } = require("../controllers/sdrController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");
const router = express.Router();

router.get("/sdr", authMiddleware, checkRole("view_sdr"), getSDRList); // List SDR records with search & pagination

module.exports = router;
