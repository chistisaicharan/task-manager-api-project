

const express=require("express")

const routes=express.Router();

const {createTask,getTasks,updateTasks,deleteTask}=require("../controllers/task.controller");

const authMiddleware=require("../middlewares/auth.middleware");

routes.post("/createTask",authMiddleware,createTask)

routes.get("/",getTasks)

routes.patch("/task/:id",authMiddleware,updateTasks)
routes.delete("/delete/:id",authMiddleware,deleteTask)
module.exports=routes