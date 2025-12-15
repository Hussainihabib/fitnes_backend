import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  sender: { type: String }, 
  message: { type: String },
  date: { type: Date, default: Date.now },
});

const SupportTicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ["issue", "feedback", "help"], required: true },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ["open", "resolved"], default: "open" },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now },
});

const SupportTicket = mongoose.model("SupportTicket", SupportTicketSchema);
export default SupportTicket;