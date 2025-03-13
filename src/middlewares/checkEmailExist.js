
import { User } from "../../database/models/User/user.model.js"
import AppError from "../utils/appError.js"
import { checkError } from "./checkError.js"

export const checkEmailExist=checkError(async(req,res,next)=>{
let existUser=await User.findOne({email:req.body.email})
if(existUser) {
    return next(new AppError("User Alreadty Exist ",409))
}

    next()
})