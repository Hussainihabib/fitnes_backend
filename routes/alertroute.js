import express from "express";
import Alert from "../models/alert.js";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user, type, title, date, time, repeat } = req.body;

    if (!user || !title || !time) {
      return res.status(400).json({ message: "User, Title, Time required" });
    }

    const alert = await Alert.create({
      user,
      type,
      title,
      date,
      time,
      repeat,
    });

    res.status(201).json(alert);
  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ message: "Failed to create alert" });
  }
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const alerts = await Alert.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    console.error("Error loading alerts:", err);
    res.status(500).json({ message: "Failed to load alerts" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Alert ID" });
  }

  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    await Notification.create({
      userId: updatedAlert.user,
      type: "reminder",
      message: `Reminder Updated: ${updatedAlert.title} at ${updatedAlert.time}`,
    });

    console.log("🔔 Reminder Notification Created!");

    res.status(200).json(updatedAlert);
  } catch (err) {
    console.error("Error updating alert:", err);
    res.status(500).json({ message: "Failed to update alert" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Alert ID" });
  }

  try {
    const deleted = await Alert.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting alert:", err);
    res.status(500).json({ message: "Failed to delete alert" });
  }
});

export default router;
