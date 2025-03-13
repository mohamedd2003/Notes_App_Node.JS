import AppError from "../utils/appError.js"

export const validateSchema=(schema)=>{
    return(req,res,next)=>{
let {error}=schema.validate({...req.body,...req.params,...req.query},{abortEarly:false})
if (!error) return next()
    else{
let errMsg=error.details.map(err=>  err.message)

next(new AppError(errMsg,401))
    }
    }
}