import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addProgress,
  getProgress,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.route("/")
  .get(protect, getProgress)
  .post(protect, addProgress);

router.route("/:id")
  .put(protect, updateProgress)
  .delete(protect, deleteProgress);

export default router;
