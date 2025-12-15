import express from "express";
import {
  addNutrition,
  getNutrition,
  deleteNutrition,
  updateNutrition,
} from "../controllers/nutritionController.js";
import { protect } from "../middleware/authMiddleware.js";
import Nutrition from "../models/Nutrition.js";

const router = express.Router();

router.get("/search", protect, async (req, res) => {
  try {
    const {
      query,
      mealType,
      minCalories,
      maxCalories,
      startDate,
      endDate,
      sort,
    } = req.query;

    const filters = { userId: req.user._id };

    if (query) {
      filters["foodItems.name"] = { $regex: query, $options: "i" };
    }

    if (mealType) filters.mealType = mealType;

    if (minCalories || maxCalories) {
      filters["foodItems.calories"] = {};
      if (minCalories)
        filters["foodItems.calories"].$gte = Number(minCalories);
      if (maxCalories)
        filters["foodItems.calories"].$lte = Number(maxCalories);
    }

    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }

    let sortOption = {};
    if (sort === "high-calories") sortOption = { "foodItems.calories": -1 };
    if (sort === "low-calories") sortOption = { "foodItems.calories": 1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const results = await Nutrition.find(filters).sort(sortOption);

    res.json(results);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error searching nutrition", error: err.message });
  }
});
router.put("/:id", protect, updateNutrition);

router.post("/", protect, addNutrition);
router.get("/", protect, getNutrition);
router.delete("/:id", protect, deleteNutrition);

export default router;
