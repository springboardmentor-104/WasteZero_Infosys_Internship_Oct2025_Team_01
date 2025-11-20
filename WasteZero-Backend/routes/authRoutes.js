import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile
} from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);   // exchanges refresh -> new access
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected
router.get("/profile", protect, getProfile);
router.post("/change-password", protect, changePassword);

export default router;
