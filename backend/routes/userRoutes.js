const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  // deleteUser,
  getUserById,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");
const { createLimiter } = require('../middlewares/rateLimitMiddleware');

const router = new express.Router();

router.post("/users", createLimiter, authMiddleware, checkRole("create_user"), addUser);
router.get("/users", authMiddleware, checkRole("view_user"), getUsers);
router.get("/user/:id", authMiddleware, checkRole("view_user"), getUserById);
router.put("/user/:id", authMiddleware, checkRole("update_user"), updateUser);
// router.delete(
//   "/user/:id",
//   authMiddleware,
//   checkRole("delete_user"),
//   deleteUser
// );

module.exports = router;
