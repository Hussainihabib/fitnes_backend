

import express from "express";
import { updateSettings, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("profilePicture"), updateUserProfile);

router.put("/:id/settings", protect, updateSettings);

export default router;
