const express = require("express");
const router = express.Router();
const { registerUser, loginUser, submitKYC } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`[REQUEST LOG] ${req.method} ${req.originalUrl} - Body:`, req.body);
  next();
});

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Submit KYC data (protected route)
router.post("/kyc/:userId", protect, submitKYC);

module.exports = router;