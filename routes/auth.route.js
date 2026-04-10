const {Register}=require("../controllers/auth.controller");

const express=require("express")

const routes=express.Router();


routes.post("/newUser",Register)


module.exports=routes