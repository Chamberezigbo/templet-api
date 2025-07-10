require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./src/router");
const passport = require("./src/config/passport");
const { connectToDatabase } = require("./src/config/prismaDb");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// routs
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

connectToDatabase().then(() => {
       app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
       
