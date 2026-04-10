// Register Controller

const bcrypt=require("bcrypt")
const user=require("../models/user_model");
const { where } = require("sequelize");
const jwt=require("jsonwebtoken");
require("dotenv").config()

const secretKey=process.env.SECRET_KEY

// Register logic
const Register= async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // 1. Validate required fields
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        // 2. Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({
            message: "Invalid email format"
            });
        }

        // 3. Check if user already exists
        const existingUser = await user.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({
            message: "User already exists",
            });
        }
        // user created
        const hashPassword= await bcrypt.hash(password,10);
        const newUser=await user.create({
            name,
            email,
            password:hashPassword
        })
        if(!newUser){
            return res.status(400).json({
                message:"user not created"
            });
        }
        return res.status(201).json({
            message:"user created successfully",
            newUser:{
                id:newUser.id,
                name:newUser.name,
                email:newUser.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Error in Register",
            err:error.message
        });
    }
}


// Login logic

const login= async(req,res)=>{
    try {
        const {email,password}=req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        // Find user by email
        const existingUser = await user.findOne({ where: { email } });
        
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        // password compare
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const token =jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            secretKey,
            {expiresIn:"1h"}
        )
        return res.status(200).json({
            message: "Login successful",
            token:token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports={Register,login}