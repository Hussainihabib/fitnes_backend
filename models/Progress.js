import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    date: { type: Date, default: Date.now },

    weight: { type: Number, required: true },

    bodyMeasurements: {
      chest: { type: Number, default: 0 },
      waist: { type: Number, default: 0 },
      arms: { type: Number, default: 0 },
      legs: { type: Number, default: 0 },
    },

    performance: {
      runTime: { type: Number, default: 0 },
      maxLift: { type: Number, default: 0 },
    },
  },

  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
