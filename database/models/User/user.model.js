import { Schema,Types,model } from "mongoose";

const schema= new Schema({
    name:{
        type:String,
        required:true,
        minLength: 3,
        maxLength: 50
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:8,
        required:true
    },
    age:{
        type:Number,
        min:18,
    required:true
    },
    phone:{
        type:Number,
        maxLength:11,
        required:true
    },
    gender:{
        type:String,
        enum:["Male","male","Female","female"]
    },
    role:{
        type:String,
        enum:['user',"admin"],
        default:'user'
    },
    is_deleted:{
        type:Boolean,
        default:false
    },
    tasks:[{
        type:Types.ObjectId,
        ref:"Task"
    }],
    confirm_Email:{
        type:Boolean,
        default:false
    },
    contact:[{
       type:Types.ObjectId,
       ref:"Photo"
    }]
},
{timestamps:{updatedAt:false},
versionKey:false})


export const User=model("User",schema)