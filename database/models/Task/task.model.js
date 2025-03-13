import { Schema,model,Types } from "mongoose";

const schema= new Schema({
    title:{
        type:String,
        required:true,
        minLength: 3,
        maxLength: 50
    },
    desc:{
        type:String,
        required:true,
    
    },
    assignTo:{
        type:Types.ObjectId,
        ref:"User"
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["toDo","doing","done"],
        required:true
    },
    deadline:
    {
        type:Date,
        default: Date.now() + 72 * 60 * 60 * 1000
    
    }
},
{timestamps:{updatedAt:false},versionKey:false,})


export const Task=model("Task",schema)