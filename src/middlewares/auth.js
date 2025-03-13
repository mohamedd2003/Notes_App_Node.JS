import { User } from "../../database/models/User/user.model.js"
import jwt from 'jsonwebtoken'
import AppError from "../utils/appError.js"

export const auth=(req,res,next)=>{
      let {token}=req.headers
        if (token=='') return next(new AppError('User Must be Logged In ',404))    
            jwt.verify(token,"MYSECRETKEY",async(err,payload)=>{
                if(err) return next(new AppError(err))
      let user=  await User.findById(payload.id)
      if (!user) return next(new AppError(`User : ${payload.name} not found`),404)
        req.payload=payload


      
        next()
      })
}