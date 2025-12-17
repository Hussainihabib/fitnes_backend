import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, contact, gender, bio, email } = req.body;

    if (name !== undefined) user.name = name;
    if (contact !== undefined) user.contact = contact;
    if (gender !== undefined) user.gender = gender;
    if (bio !== undefined) user.bio = bio;

    if (email !== undefined && email !== user.email) {
      user.email = email;
    }

    // ✅ CLOUDINARY FIX
    if (req.file && req.file.path) {
      user.profilePicture = req.file.path; // Cloudinary URL
    }

    const updatedUser = await user.save();

    const sendUser = updatedUser.toObject();
    delete sendUser.password;

    res.json(sendUser);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.settings = {
      ...user.settings,
      ...req.body.settings,
    };

    await user.save();

    res.json({
      message: "Settings updated successfully",
      settings: user.settings,
    });
  } catch (err) {
    res.status(500).json({
      message: "Settings update error",
      error: err.message,
    });
  }
};
