import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Exercise name is required"],
    trim: true,
    minlength: 1
  },
  sets: {
    type: Number,
    required: [true, "Sets is required"],
    min: [1, "Sets must be at least 1"]
  },
  reps: {
    type: Number,
    required: [true, "Reps is required"],
    min: [1, "Reps must be at least 1"]
  },
  weight: {
    type: Number,
    required: [true, "Weight is required"],
    min: [1, "Weight must be at least 1"]
  },
});

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 1
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: 1
    },
    exercises: {
      type: [exerciseSchema],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one exercise is required",
      },
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
