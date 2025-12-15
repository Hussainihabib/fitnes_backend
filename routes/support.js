import express from "express";
import SupportTicket from "../models/SupportTicket.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, type, subject, message } = req.body;
    if (!name || !email || !type || !message) {
      return res.status(400).json({ message: "Name, email, type and message required" });
    }

    const ticket = await SupportTicket.create({ name, email, type, subject, message });

    return res.status(201).json({ message: "Ticket created", ticketId: ticket._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const secret = req.headers["x-admin-secret"] || req.query.secret;
    if (secret !== process.env.ADMIN_SECRET) return res.status(401).json({ message: "Unauthorized" });

    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    return res.json({ tickets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/reply/:id", async (req, res) => {
  try {
    const secret = req.headers["x-admin-secret"] || req.query.secret;
    if (secret !== process.env.ADMIN_SECRET) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const { message, resolve } = req.body; 
    const ticket = await SupportTicket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (message) ticket.replies.push({ sender: "owner", message });
    if (resolve) ticket.status = "resolved";

    await ticket.save();
    return res.json({ message: "Reply added", ticket });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;