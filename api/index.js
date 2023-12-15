const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
// for accessing dotenv file
dotenv.config();
// connecting mongoose
mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
app.get("/", (req, res) => {
  res.json("test ok");
});

app.get('/profile', (req, res) => {
  // extracting token from cookie
  const { token } = req.cookies || {};
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        console.error(err);
        res.status(401).json('Token verification failed');
      } else {
        // Log userData to console for debugging
        console.log('User Data:', userData);
      
        // Respond with userData
        res.json(userData);
      }
    });
  } else {
    res.status(401).json('No token');
  }
});

app.post('/login', async(req, res) => {
  const {username, password} = req.body;
 const foundUser = await User.findOne({username})
 if(foundUser){
  const passok = bcrypt.compareSync(password, foundUser.password)
  if(passok){
    jwt.sign({userId: foundUser._id, username}, jwtSecret, {},(err,token)=>{
      res.cookie('token', token,{sameSite:'none', secure:true}).json({
        id: foundUser._id,
      })
    })
  }
 }
})

// register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
  const createdUser = await User.create({ username, password: hashedPassword });
  // creating jwt token
  jwt.sign({ userId: createdUser._id,username }, jwtSecret, {}, 
    (err, token) => {
      // using callback
    if (err) throw err;
    // setting cookie with name token and storing token in it
    res.cookie("token", token,{sameSite:"none", secure: true}).status(201).json({
      userId: createdUser._id
    });
  });
});
app.listen(8080);
