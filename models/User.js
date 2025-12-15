import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    contact: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },

    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },

    settings: {
      theme: { type: String, default: "light" },
      units: {
        weight: { type: String, default: "kg" },
        distance: { type: String, default: "km" },
      },
      notifications: {
        workout: { type: Boolean, default: true },
        nutrition: { type: Boolean, default: true },
        progress: { type: Boolean, default: true },
      },
      timezone: { type: String, default: "Asia/Karachi" }
    }

  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
