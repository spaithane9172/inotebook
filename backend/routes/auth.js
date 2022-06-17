const express=require("express");
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const router=express.Router();
const User=require("../models/User");
const fetchuser =require("../middleware/fetchuser");
router.post('/createuser/',[
    body("email","Enter Valid Email").isEmail(),
    body("name","Enter Valid Name").isLength({min:3}),
    body("password","Enter Valid Password").isLength({min:5})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user=await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry user with this email already exists"});
        }
        const salt= await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
          })
          const data={
              user:{
                id:User.id
              }
          }
          const autTocken=jwt.sign(data,"Rama");
          res.json({autTocken})
          //res.json(user);    
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Error occured");
    }
});
router.post("/login",[
    body("email","Enter Invalid Email").isEmail(),
    body("password","Enter correct password").exists()
],async (req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty){
        return res.status(400).json({Error:error.array()});
    }
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct creadentials."});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(404).json({error:"Please try to login with correct creadentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authTocken=jwt.sign(data,"rama");
        res.json({authTocken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
});
router.post("/getuser",fetchuser,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(401).send("Internal server Error.")
    }
});

module.exports=router;