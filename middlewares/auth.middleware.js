const jwt = require("jsonwebtoken");

require("dotenv").config()

const secretKey=process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from headers
    const authHeader = req.headers.authorization;

    // 2. Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    // 3. Extract token (Bearer token)
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, secretKey);

    // 5. Attach user data to request
    req.user = decoded;

    // 6. Move to next
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;