import Joi from "joi"
export const addTaskSchema=Joi.object({
    title:Joi.string().min(3).max(15).required(),
    desc:Joi.string().min(15).max(200).required(),
    createdBy:Joi.string().hex().length(24).required(),
    assignTo:Joi.string().hex().length(24).required(),
})


export const updateTaskSchema=Joi.object({
    title:Joi.string().min(3).max(15).required(),
    desc:Joi.string().min(15).max(200).required(),
  status:Joi.string().min(4).max(5).required()
})



