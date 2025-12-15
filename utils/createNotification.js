import Notification from "../models/Notification.js";

export async function createNotification(userId, message, type = "general") {
  try {
    const saved = await Notification.create({
      userId,
      message,
      type,
    });

    console.log("Notification Created:", saved);  
    return saved;
  } catch (error) {
    console.error("Notification Error:", error);
  }
}
