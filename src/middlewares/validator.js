const { body, validationResult } = require("express-validator");

// Validation for signup//
exports.validateSignup = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("fullName")
    .notEmpty()
    .withMessage("Please enter your full name")
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/)
    .withMessage("Full name must contain at least two words"),
  body("phone")
    .notEmpty()
    .withMessage("Please enter your phone number")
    .isLength({ min: 9 })
    .withMessage("Phone number must be at least 9 digits long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

// validation rules for login //
exports.validateLogin = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
