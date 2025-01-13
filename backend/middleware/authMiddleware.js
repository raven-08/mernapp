const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for authorization header and ensure it starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the decoded token's ID
      const user = await User.findById(decoded.id).select("-password");

      // Check if the user still exists
      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user does not exist");
      }

      // Attach user to the request object
      req.user = user;

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    // If no token is provided
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
