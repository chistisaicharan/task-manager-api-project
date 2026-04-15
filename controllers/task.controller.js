
const task=require("../models/task_model");
//  createTask function
const createTask=async(req,res)=>{
    try {
        const {title,description}=req.body
        const userId=req.user.id;
        if(!title || !description){
            return res.status(400).json({
                message:"Required  ALL Fields "
            })
        }
        const newTask= await task.create({
            title:title,
            description:description,
            userId:userId
        })
        return res.status(201).json({
            message:"task Created successfully ",
            data: newTask
        })
    } catch (error) {
        return res.status(500).json({
            message:"Error in createTask",
            error:error.message
        })
    }
}

// get all task

const getTasks=async(req,res)=>{
    try {
        // get all data from task
        const taskData=await task.findAll()
        // check data
        if(!taskData){
            return res.status(400).json({
                message:"Data Not Found"
            });
        }
        return res.status(200).json({
            message:"Get All Data",
            data:taskData
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            err:error.message
        })
        
    }

}

const updateTasks=async(req,res)=>{
    try {
        const id=Number(req.params.id)
        const userId=req.user.id
        if(!id){
            return res.status(400).json({
                message:"id not found"
            })
        }
        const findTask=await task.findOne({where:{id,userId}})
        if(!findTask){
            return res.status(400).json({
                message:"Task not found"
            });
        }
        const { title, description, status, priority } = req.body;
        const updateTask=await findTask.update({
            title: title ?? findTask.title,
            description: description ?? findTask.description,
            status: status ?? findTask.status,
            priority: priority ?? findTask.priority

        })
        return res.status(200).json({
            message:"update successfully",
            data:updateTask
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            err:error.message
        })
    }

}

const deleteTask=async(req,res)=>{
try {
    // 1. Get taskId from params
    const { id } = req.params;

    // 2. Get userId from token
    const userId = req.user.id;

    // 3. Find task using taskId + userId + not deleted
    const task = await task.findOne({
      where: {
        id: id,
        userId: userId,
        isDeleted: false,
      },
    });

    // 4. If not found
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // 5. Soft delete (update isDeleted = true)
    task.isDeleted = true;
    await task.save();

    // 6. Send response
    return res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }

}

// filter by status and priority

const taskFiltering=async(req,res)=>{
    try {
        const {status,priority}=req.query
        const userId=req.user.id
        
        let whereCondition={
            userId:userId,
            isDeleted: false,
        };
        if(status){
            whereCondition.status==status
        }
        if(priority){
            whereCondition.priority==priority
        }
        // 4. Fetch filtered tasks from DB
        const tasks = await task.findAll({
            where: whereCondition,
        });
        if (tasks.length === 0) {
            return res.status(404).json({
            message: "No tasks found",
            });
        }

    // 6. Send response
        return res.status(200).json({
            message: "Filtered tasks fetched successfully",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            message:"Interal Server Error",
            err:error.message
        })
    }
}

module.exports={createTask,getTasks,updateTasks,deleteTask,taskFiltering}