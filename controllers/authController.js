import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ======================== REGISTER USER ========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields missing",
      });
    }

    // No spaces in any field
    if (/\s/.test(name) || /\s/.test(email) || /\s/.test(password) || (contact && /\s/.test(contact))) {
      return res.status(400).json({
        success: false,
        message: "Spaces are not allowed in any field.",
      });
    }

    // Name only alphabets
    if (!/^[A-Za-z]+$/.test(name)) {
      return res.status(400).json({
        success: false,
        message: "Name must contain only alphabets (A-Z a-z)",
      });
    }

    // Contact digits only (optional field)
    if (contact && !/^[0-9]+$/.test(contact)) {
      return res.status(400).json({
        success: false,
        message: "Contact number must contain only digits (0-9)",
      });
    }

    // Password strong validation
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[@$!%*?&]/.test(password)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number, and special character.",
      });
    }

    // Check exist
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      contact,
      gender,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        gender: user.gender,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================== LOGIN USER ========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email & password",
      });
    }

    // No spaces validation on login also
    if (/\s/.test(email) || /\s/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Spaces are not allowed in email or password.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        gender: user.gender,
        profilePicture: user.profilePicture,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
