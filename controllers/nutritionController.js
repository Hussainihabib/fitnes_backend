import Nutrition from "../models/Nutrition.js";

export const addNutrition = async (req, res) => {
  const { mealType, foodItems } = req.body;

  if (!mealType || !foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
    return res.status(400).json({ message: "Meal type and food items are required" });
  }

  try {
    const nutrition = await Nutrition.create({
      userId: req.user._id,
      mealType,
      foodItems,
    });

    res.status(201).json({
      success: true,
      message: "Nutrition log added successfully",
      data: nutrition,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNutrition = async (req, res) => {
  try {
    const logs = await Nutrition.find({ userId: req.user._id });

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNutrition = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Nutrition.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Nutrition log not found" });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition log deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateNutrition = async (req, res) => {
  try {
    const { id } = req.params;

    const nutrition = await Nutrition.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition log not found" });
    }

    if (req.body.mealType !== undefined) {
      nutrition.mealType = req.body.mealType;
    }

    if (req.body.foodItems !== undefined && req.body.foodItems.length > 0) {
      nutrition.foodItems = req.body.foodItems;
    }

    const updated = await nutrition.save();

    res.status(200).json({
      success: true,
      message: "Nutrition log updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
