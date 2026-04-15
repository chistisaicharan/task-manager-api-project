

const express=require("express")

const routes=express.Router();

const {createTask,getTasks,updateTasks,deleteTask,taskFiltering,searchTask}=require("../controllers/task.controller");

const authMiddleware=require("../middlewares/auth.middleware");

routes.post("/createTask",authMiddleware,createTask)

routes.get("/",getTasks)

routes.patch("/task/:id",authMiddleware,updateTasks)
routes.delete("/delete/:id",authMiddleware,deleteTask)

// filter and search
routes.get("/task",authMiddleware,taskFiltering)

routes.get("/task",authMiddleware,searchTask)


module.exports=routes