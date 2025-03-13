import { Router } from "express";
import { addTask, deleteTask, getAllTasks,
     getAllTasksNotDone, getTasksOfOneUser,
      updateTask } from "./task.controller.js";
import { auth } from "../../middlewares/auth.js";
import { validateSchema } from "../../middlewares/validate.js";
import { addTaskSchema, updateTaskSchema } from "./task.validate.js";
const taskRouter=Router()

taskRouter.post("/add",validateSchema(addTaskSchema),auth,addTask)
taskRouter.route("/:id").post(validateSchema(updateTaskSchema), auth,updateTask).delete(auth,deleteTask)
taskRouter.get("/",getAllTasks)
taskRouter.get("/deadline",getAllTasksNotDone)
taskRouter.get("/userTasks/:id",getTasksOfOneUser)
export default taskRouter