import Joi from 'joi'

export const signUpSchema=Joi.object({

        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().email().min(8).max(50).required(),
        age:Joi.number().min(18).max(80).required(),
        role:Joi.string().min(4).max(5),
        password:Joi.string().min(8).max(60).required().pattern(/^[A-Z][a-zA-z0-9_#@!?]{7,60}$/),
        rePassword:Joi.valid(Joi.ref("password")).required(),
        phone:Joi.string().min(11).max(11).pattern(/^01(1|2|0|5)[0-9]{8}$/).required(),
        gender:Joi.string().min(4).max(6).required(),
        is_deleted:Joi.boolean()
   
})

export const loginSchema=Joi.object({

    email:Joi.string().email().min(8).max(50).required(),
    password:Joi.string().min(8).max(60).required().pattern(/^[A-Z][a-zA-z0-9_#@!?]{7,60}$/),

})

export const changePasswordSchema=Joi.object({

    email:Joi.string().email().min(8).max(50).required(),
    oldPassword:Joi.string().min(8).max(60).required().pattern(/^[A-Z][a-zA-z0-9_#@!?]{7,60}$/),
    newPassword:Joi.string().min(8).max(60).required().pattern(/^[A-Z][a-zA-z0-9_#@!?]{7,60}$/),

})

export const updateSchema=Joi.object({

    name:Joi.string().min(3).max(50).required(),
    age:Joi.number().min(18).max(80).required(),

})




