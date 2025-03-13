import { model, Schema } from "mongoose";

const schema=Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
     
    },
    file:{
        type:String
    }
})

export const Photo=model("Photo",schema)