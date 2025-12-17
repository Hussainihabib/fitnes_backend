import express from "express";
import {
  updateSettings,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // ✅ Cloudinary upload

const router = express.Router();

router.get("/profile", protect, getUserProfile);

// ✅ Cloudinary image upload
router.put(
  "/profile",
  protect,
  upload.single("profilePicture"),
  updateUserProfile
);

router.put("/:id/settings", protect, updateSettings);

export default router;
