const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('./models/User')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL,
}))
app.get('/test',(req,res)=>{
 res.json('success')
})
mongoose.connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET;

app.post('/register',async(req,res)=>{
 const {username,password} = req.body;
 const createdUser = await User.create({username, password})
 jwt.sign({userId: createdUser._id}, jwtSecret,(err, token)=>{
    if(err) throw err;
    res.cookie('token',token).status(201).json('ok');
 })
})

app.listen(8080)

//putMccurgV06IGyC