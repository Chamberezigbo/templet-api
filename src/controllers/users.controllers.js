const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

exports.signupUser = async (req, res, next) => {
  try {
    const { email, fullName, phone, password } = req.body;

    // check if user already exist//
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already" });
    }

    //hash your password before saving//
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user//
    const user = await prisma.user.create({
      data: { email, fullName, phone, password: hashedPassword },
    });

    // Generate JWT token //
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "User registration successfully",
      token,
      user: { id: user.id, email: user.email, fullname: user.fullName },
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // find user by email//
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    // compare password//
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token //
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
      user: { id: user.id, email: user.email, fullname: user.fullName },
    });
  } catch (error) {
    next(error);
  }
};

exports.googlAuth = async (req, res, next) => {
  try {
    // Extract user and token from passport
    const { user, token } = req.user;

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    res.send("get all users");
  } catch (error) {
    console.log(error);
  }
};
