
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.error("[AUTH ERROR] User not found for decoded ID:", decoded.id);
        return res.status(401).json({ message: "User not found" });
      }

      console.log("[AUTH SUCCESS] User authenticated:", req.user._id);
      next();
    } catch (error) {
      console.error("[TOKEN ERROR] Failed to verify token:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.warn("[TOKEN MISSING] Authorization header missing or invalid");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
