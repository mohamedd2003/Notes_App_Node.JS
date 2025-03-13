
import nodemailer from "nodemailer"
import { emailTemplate } from "./EmailTemplate.js";
import jwt from 'jsonwebtoken'
const transporter = nodemailer.createTransport({
service:'gmail',
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "mohamedd.hossammm@gmail.com",
    pass: "xrsmdndsxgfybbpo",
  },
});

export const sendEmail=async(email)=>{

jwt.sign(email,"MYSECRETKEY",async(err,token)=>{

    await transporter.sendMail({
       from: '"Assignmenet 08👻" <mohamedd.hossammm@gmail.com>', // sender address
       to: email, // list of receivers
       subject: "Hello ✔", // Subject line
       text: "Hello world?", // plain text body
       html: emailTemplate(token), // html body
     });
})
    
}

