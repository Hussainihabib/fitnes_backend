import Workout from "../models/Workout.js";
import { createNotification } from "../utils/createNotification.js";

export const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      userId: req.user._id,
      title: req.body.title,
      category: req.body.category,
      exercises: req.body.exercises,
      tags: req.body.tags,
    });

    console.log("WORKOUT CREATED → Creating notification...");

    await createNotification(
      req.user._id,
      `New workout added: ${workout.title}`,
      "workout"
    );

    return res.status(201).json(workout);
  } catch (error) {
    console.error("Workout Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(workouts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markWorkoutComplete = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    if (workout.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    workout.completed = true;
    await workout.save();

    await createNotification(
      req.user._id,
      `Workout Completed: ${workout.title}`,
      "workout"
    );

    return res.json({ message: "Workout marked complete", workout });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    if (workout.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    workout.title = req.body.title || workout.title;
    workout.category = req.body.category || workout.category;
    workout.exercises = req.body.exercises || workout.exercises;
    workout.tags = req.body.tags || workout.tags;

    const updated = await workout.save();
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    if (workout.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    await workout.deleteOne();
    
    return res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
