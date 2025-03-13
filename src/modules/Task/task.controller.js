import { Task } from "../../../database/models/Task/task.model.js";
import { User } from "../../../database/models/User/user.model.js";
import { checkError } from "../../middlewares/checkError.js";
import AppError from "../../utils/appError.js";
//Add Task
export const addTask=checkError(async(req,res,next)=>{

        if(req.payload.role!=="admin") return next(new AppError("Only Admin can Add Task"))
            const {title,desc,assignTo,createdBy,status}=req.body
        if(!title||!desc||!assignTo||!createdBy||!status) return next(new AppError("Body is required"))
            if (req.payload.id !== createdBy) {
                return next(new AppError('ID of the creator does not match the logged-in user', 403));
            }
            let assignToUser=  await User.findById(req.body.assignTo)
            
        if (!assignToUser) return next(new AppError('You try to assign Task To User Not Found',404))
            if(req.body.assignTo.toString()!==assignToUser._id.toString()) return next(new AppError('id of creator not match'))
           let task= await Task.insertOne(req.body)
        assignToUser.tasks.push(task._id)
        await assignToUser.save()
        res.json({message:"success",task})
})

//update Task
export const updateTask=checkError(async(req,res,next)=>{
    let task =await Task.findById(req.params.id)
    if(!task) return next(new AppError("Task Not found",404))
       
        
    if(task.createdBy.toString()!== req.user.id.toString()) return next(new AppError("You Aren't Authrized to update this task"))
        const updates = req.body;
        const allowUpdateFields=['title',"desc","status","assignTo"]
    const isValid=Object.keys(updates).every((key)=>allowUpdateFields.includes(key))
    if (!isValid) {
        return next(new AppError("Invalid updates") );
      }
 let assignToUser= await    User.findById(req.body.assignTo) 
 if(!assignToUser) return next(new AppError("Your Try to Assign Task to unfounded User",404))
        await task.updateOne(updates)
        await task.save()
        res.json({message:"success",updatedTask:updates})
})

export const deleteTask=checkError(async(req,res,next)=>{
    console.log(req.params.id)
    
   let task= await Task.findById(req.params.id)
if(!task)return next(new AppError("Task Not Found"),404)
    if(task.createdBy.toString()!== req.user.id.toString()) return next(new AppError ('You arnot Authrized to delete this Task'))
      await  task.deleteOne()
    
    res.json({message:"Task Deleted Suuceessssfully"})
})

export const getAllTasks=checkError(async(req,res,next)=>{
 let tasks= await Task.find().populate("createdBy","-password")
 res.json({message:"Success",All_Tasks:tasks})
})
export const getAllTasksNotDone=checkError(async(req,res,next)=>{
    const currentDate=Date.now()
 let tasks= await Task.find({deadline:{$lt:currentDate}})
 res.json({message:"Success",All_Tasks:tasks})
})
export const getTasksOfOneUser=checkError(async(req,res,next)=>{
 let tasks= await Task.find({assignTo:{$eq:req.params.id}}).populate("assignTo","-password")
 res.json({message:"Success",All_Tasks:tasks})
})