const User = require("../models/userModel");

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.warn("[REGISTER WARNING] User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();
    console.log("[REGISTER SUCCESS] User registered:", user._id);

    const token = user.generateToken();
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, kycCompleted: false },
    });
  } catch (error) {
    console.error("[REGISTER ERROR] Error registering user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      console.warn("[LOGIN WARNING] Invalid credentials for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();
    console.log("[LOGIN SUCCESS] User logged in:", user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        kycCompleted: user.kycCompleted, // Include KYC status
      },
    });
  } catch (error) {
    console.error("[LOGIN ERROR] Error logging in user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Submit KYC data
const submitKYC = async (req, res) => {
  try {
    const { profession, contact, country } = req.body;
    const userId = req.user._id;

    console.log("[KYC SUBMISSION] Fetching user for ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.warn("[KYC ERROR] User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    user.kycData = { profession, contact, country };
    user.kycCompleted = true; // Mark KYC as completed
    await user.save();

    console.log("[KYC SUCCESS] KYC data saved for user:", user._id);
    res.status(200).json({ message: "KYC data submitted successfully", kycCompleted: true });
  } catch (error) {
    console.error("[KYC ERROR] Error submitting KYC data:", error.message);
    res.status(500).json({ message: "An error occurred while submitting KYC data." });
  }
};

module.exports = { registerUser, loginUser, submitKYC };