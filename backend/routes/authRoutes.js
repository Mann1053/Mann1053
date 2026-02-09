const express = require("express");
const { register, login, verifyOTP, logout } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { authLimiter } = require('../middlewares/rateLimitMiddleware');

const router = new express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/verify-otp", verifyOTP);
router.post("/logout", authMiddleware, logout);

module.exports = router;
