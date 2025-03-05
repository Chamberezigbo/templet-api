const express = require("express");
const router = express.Router();

const userRoutes = require("./users.router");

router.use("/user", userRoutes);

module.exports = router;
