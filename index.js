import express from "express"

import userRouter from "./src/modules/User/user.routes.js"
import dbconnection from "./database/dbconnection.js"
import AppError from "./src/utils/appError.js"
import { globalError } from "./src/middlewares/globalError.js"
import taskRouter from "./src/modules/Task/task.routes.js"
import multer from "multer"

const app=express()
const port=3000
app.use(express.json())
app.use(express.static("uploads"))
app.use("/user",userRouter)
app.use("/task",taskRouter)

app.use(globalError)

app.use("*",(req,res,next)=>{
    next(new AppError(`Route Not Found ${req.originalUrl}`,404))
})
app.listen(port,(req,res)=>console.log(`Server Is Runinng On Port ${port}`))