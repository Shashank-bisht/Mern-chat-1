const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// for accessing dotenv file
dotenv.config();
// connecting mongoose
mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const jwtSecret = process.env.JWT_SECRET;
app.get("/", (req, res) => {
  res.json("test ok");
});

// register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const createdUser = await User.create({ username, password });
  // creating jwt token
  jwt.sign({ userId: createdUser._id }, jwtSecret, {}, 
    (err, token) => {
      // using callback
    if (err) throw err;
    // setting cookie with name token and storing token in it
    res.cookie("token", token).status(201).json({
      id: createdUser._id
    });
  });
});
app.listen(8080);
