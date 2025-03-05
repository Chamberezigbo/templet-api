const express = require("express");
const userController = require("../controllers/users.controllers");
const { validateSignup, validateLogin } = require("../middlewares/validator");
const passport = require("../config/passport");

const router = express.Router();

// Define all the routes and attach them to the controller//
router.get("/", userController.getAllUsers);
router.post("/signup", validateSignup, userController.signupUser);
router.post("/login", validateLogin, userController.loginUser);

// google OAuth Login Route//
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback Route//
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  userController.googlAuth // Call the controller functions
);

module.exports = router;
