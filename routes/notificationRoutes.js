
import express from "express";
import Notification from "../models/Notification.js";
import { 
    getNotifications, 
    createNotification, 
    markAsRead, 
    markAllAsRead 
} from "../controllers/notificationController.js"; 

const router = express.Router();

router.get("/:userId", getNotifications);

router.post("/", createNotification);

router.put("/read/:id", markAsRead); 

router.put("/read/all/:userId", markAllAsRead);


export default router;

