const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authentication");
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoder = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoder;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token." });
  }
};
