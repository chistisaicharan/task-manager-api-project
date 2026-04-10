const {Register,login}=require("../controllers/auth.controller");

const express=require("express")

const routes=express.Router();


routes.post("/newUser",Register)

routes.post("/login",login)


module.exports=routes