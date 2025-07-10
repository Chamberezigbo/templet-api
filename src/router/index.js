const express = require("express");
const router = express.Router();


const userRoutes = require("./users.router");
const businessRouter = require("./business.router");
const {errorHandler} = require("../middlewares/error.middleware")

router.use("/user", userRoutes);
router.use("/business", businessRouter)

router.use((req,res) => {
       res.status(404).json({
              success: false,
              message: "404 🦄 Oops! This endpoint wandered off like a lost semicolon. Try another route, coder!"
       })
})

router.use(errorHandler)

module.exports = router;
