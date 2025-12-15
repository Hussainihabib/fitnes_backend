import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import supportRoutes from "./routes/support.js";
import alertRoutes from "./routes/alertroute.js";
import cronJobs from "./utils/crons.js";

dotenv.config();
const app = express();

/* ✅ CORS – FINAL */
app.use(cors({
  origin: "https://fitnesstracker-beta-five.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

/* ✅ ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/support", supportRoutes);

app.get("/", (req, res) => res.send("Backend running"));

cronJobs();

/* ❌ app.listen() REMOVE */
/* ✅ Vercel ke liye */
export default app;
