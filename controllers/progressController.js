import Progress from "../models/Progress.js";

export const addProgress = async (req, res) => {
  try {
    const progress = await Progress.create({
      user: req.user._id,
      weight: req.body.weight,
      bodyMeasurements: req.body.bodyMeasurements,
      performance: req.body.performance,
    });

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const record = await Progress.findById(req.params.id);

    if (!record)
      return res.status(404).json({ message: "Progress record not found" });

    if (record.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    record.weight = req.body.weight ?? record.weight;
    record.bodyMeasurements = req.body.bodyMeasurements ?? record.bodyMeasurements;
    record.performance = req.body.performance ?? record.performance;

    const updated = await record.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProgress = async (req, res) => {
  try {
    const record = await Progress.findById(req.params.id);

    if (!record)
      return res.status(404).json({ message: "Progress not found" });

    if (record.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    await record.deleteOne();

    res.json({ message: "Progress deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
