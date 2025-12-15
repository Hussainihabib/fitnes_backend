import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true , },
  protein: { type: Number },
  carbs: { type: Number  },
  fat: { type: Number },
});

const nutritionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mealType: { type: String, required: true },
    foodItems: { type: [foodItemSchema], required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Nutrition", nutritionSchema);
