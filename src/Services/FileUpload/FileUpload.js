import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import AppError from "../../utils/appError.js";
export const fileUpload=()=>{

    const storage = multer.diskStorage({})
      

      function fileFilter (req, file, cb) {
     
        
if(file)
  {cb(null, true)}
else{
  // You can always pass an error if something goes wrong:
  cb(new AppError('Error Upload Image',401))

}
     
      

      }
      const upload = multer({ storage,fileFilter })
return upload
}
export const uploadSingleFile=(fieldname)=>fileUpload().single(fieldname)
export const uploadMixFiles=(arrayOfFields)=>fileUpload().fields(arrayOfFields)