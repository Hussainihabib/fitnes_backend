import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNotification = async (req, res) => {
  const { userId, type, message, link } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: "userId and message are required" });
  }

  try {
    const notif = await Notification.create({ userId, type, message, link });
    res.status(201).json(notif);
  } catch (err) {
    console.error("Notification error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);
    if (!notif) return res.status(404).json({ message: "Not found" });
    notif.read = true;
    await notif.save();
    res.status(200).json(notif);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { userId: req.params.userId, read: false }, 
      { $set: { read: true } } 
    );
    res.status(200).json({ 
        message: "All notifications marked as read.", 
        updatedCount: result.nModified 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};