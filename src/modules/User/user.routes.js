import { Router } from "express";
import { changePassword, deleteUser, getUserDetails, Login, register, softDelete, updateUser, upload, verifyEmail } from "./user.controller.js";
import { checkEmailExist } from "../../middlewares/checkEmailExist.js";
import { validateSchema } from "../../middlewares/validate.js";
import { changePasswordSchema, loginSchema, signUpSchema, updateSchema } from "./user.validate.js";
import { fileUpload, uploadMixFiles, uploadSingleFile } from "../../Services/FileUpload/FileUpload.js";
import { auth } from "../../middlewares/auth.js";


 const userRouter=Router()
userRouter.post("/register",validateSchema(signUpSchema),checkEmailExist,register)
userRouter.post("/login",validateSchema(loginSchema),Login)
userRouter.put("/changePassword",validateSchema(changePasswordSchema),changePassword)
userRouter.put("/update",validateSchema(updateSchema),updateUser)
userRouter.patch("/softDelete",softDelete)
userRouter.delete("/delete",deleteUser)
userRouter.get("/verify/:token",verifyEmail)
userRouter.get("/details",auth,getUserDetails)
// userRouter.post("/upload",auth,uploadSingleFile('path'),upload)
userRouter.post("/upload",auth,uploadMixFiles([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]),upload)

export  default userRouter