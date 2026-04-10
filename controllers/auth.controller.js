// Register Controller

const bcrypt=require("bcrypt")
const user=require("../models/user_model")


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


module.exports={Register}