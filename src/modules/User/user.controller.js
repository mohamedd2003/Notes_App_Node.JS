import { User } from "../../../database/models/User/user.model.js"
import { checkError } from "../../middlewares/checkError.js"
import bcrypt from "bcryptjs"
import AppError from "../../utils/appError.js"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../Services/Email/Email.js"
import { v2 as cloudinary } from 'cloudinary';


import { CronJob } from 'cron';
import { Photo} from "../../../database/models/Photo/Photo.model.js"
//Register

export const register=checkError(async(req,res,next)=>{
 
   req.body.password=bcrypt.hashSync(req.body.password,8)
  

 let user=   await User.insertOne(req.body)
 user.password=undefined
 sendEmail(req.body.email)
 res.status(200).json({message:"Success",user})
})

//Login
export const Login=checkError(async(req,res,next)=>{
  const user=  await User.findOne({email:req.body.email})

  if(!user) return next(new AppError("User Not Found",404))
    if(!user || !bcrypt.compareSync(req.body.password,user.password)) return next(new AppError("Email Or Password Incorrect",401))
        jwt.sign(
    {
    name:user.name,
    email:user.email,
    password:user.password,
    role:user.role,
    id:user._id},"MYSECRETKEY",(err,token)=>{
    if(err) return next(new AppError(err))
        res.status(200).json({message:"Success",token})
        })
    
})

// changePassword

export const changePassword=checkError(async(req,res,next)=>{
    let {token}=req.headers
    
    if (token==="") return next(new AppError("User Must be LoggedIn",401))
        if(token !==null){

            jwt.verify(token,"MYSECRETKEY",async(err,decoded)=>{
if(err) return next(new AppError(err))
    let existUser =await User.findOne({email:decoded.email})
    if(!existUser || !bcrypt.compareSync(req.body.oldPassword,existUser.password)) return next(new AppError("Old Password Incorrect",401))
    req.body.newPassword=bcrypt.hashSync(req.body.newPassword,8)
             await   existUser.updateOne({password:req.body.newPassword})
await existUser.save()       
        res.json({message:"password Changed SuccessFully"})
            })
        }
    
})

export const updateUser=checkError(async(req,res,next)=>{
    let{token}=req.headers
    
    if(token==""){
    return  next(new AppError("User Must Logged In",401))
    }
    if(token!==""){
        jwt.verify(token,"MYSECRETKEY",async(err,decode)=>{
            
            if (err) return next(new AppError(err))
              let updatedUser=  await User.findByIdAndUpdate(decode.id,{name:req.body.name,age:req.body.age},{new:true})
            if(!updatedUser) return next(new AppError("User Not Found"),404)
            else{
        
                res.status(200).json({message:"User Updated Success",updateUser})
            }    

        })
    }
})
export const deleteUser=checkError(async(req,res,next)=>{

    let{token}=req.headers
    if(token==""){
    return  next(new AppError("User Must Logged In",401))
    }
    if(token!==""){
        jwt.verify(token,"MYSECRETKEY",async(err,decode)=>{
            
            if (err) return next(new AppError(err))
              let deletedUser=  await User.findByIdAndDelete(decode.id)
            if(!deletedUser) return next(new AppError("User Not Found"),404)
            else{
        
                res.status(200).json({message:"User Deleted Success"})
            }    

        })
    }
})

export const softDelete=checkError(async(req,res,next)=>{

    let{token}=req.headers
    if(token==""){
    return  next(new AppError("User Must Logged In",401))
    }
    if(token!==""){
        jwt.verify(token,"MYSECRETKEY",async(err,decode)=>{
            
            if (err) return next(new AppError(err))
              let user=  await User.findById(decode.id)
            if(!user) return next(new AppError("User Not Found"),404)

                 user.is_deleted=true
               await user.save()
        user.password=undefined
                res.status(200).json({message:"User is SoftDeleted",user})

        })
    }
})

export const verifyEmail=checkError(async(req,res,next)=>{
    let {token} =req.params
    jwt.verify(token,'MYSECRETKEY',async(err,payload)=>{
let user= await User.findOneAndUpdate({email:payload},{confirm_Email:true})

if(!user) next(new AppError("user Not Found"),404)
 
res.json({message:"success"})
    })
})

export const upload=checkError(async(req,res,next)=>{

    let imagePath=req.files.image[0].path
    let imageName=req.files.image[0].originalname
    let fileName=req.files.file[0].originalname
    let filePath=req.files.file[0].path
    cloudinary.config({ 
        cloud_name: 'dnmwmrxmr', 
        api_key: '586539159664933', 
        api_secret: 'NvfUL5qc6pWKBmar4PPc8uMPfes' // Click 'View API Keys' above to copy your API secret
    });
    // Upload image
    const imageUpload = await cloudinary.uploader.upload(
        imagePath, 
        { public_id: imageName }
    );
    
    // Upload file
    const fileUpload = await cloudinary.uploader.upload(
        filePath, 
        { public_id: fileName }
    );
    
   
    
 req.body.image=imageUpload.secure_url
 req.body.file=fileUpload.secure_url
   
   let photo= await Photo.insertOne(req.body)
   let users= await User.findById(req.payload.id)
   users.contact.push(photo._id)
   await users.save()
   console.log(users);
   

   res.json(photo)
})

export const getUserDetails=checkError(async(req,res,next)=>{
  
    
  let user=  await User.findById(req.payload.id,"-password").populate("contact","image file -_id")
  if(!user)return next(new AppError("User Not fOUND",404))
    res.json(user)
})

// const job = new CronJob(
// 	'* 53 * * * *', // cronTime
// 	async function () {
// 	await	User.findOneAndDelete({confirm_Email:false})
// 	}, // onTick
// 	null, // onComplete
// 	true, // start
	
// );
