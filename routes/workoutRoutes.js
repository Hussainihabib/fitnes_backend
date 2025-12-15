import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  markWorkoutComplete, 
} from "../controllers/workoutController.js";

const router = express.Router();

router.put("/complete/:id", protect, markWorkoutComplete);


router.route("/")
  .get(protect, getWorkouts)
  .post(protect, createWorkout);

router.route("/:id")
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);


export default router;
