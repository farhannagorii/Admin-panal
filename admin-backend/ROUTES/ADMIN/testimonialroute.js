import express from "express"
import { changeStatus, testimonialdelete, testimonialinsert, testimonialview } from "../../CONTROLLERS/ADMIN/testimonialcontroller.js"
import multer from "multer"

let testimonialroutes = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/testimonial')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname+ "-" +  Date.now() + file.originalname)
  }
}) 

const upload = multer({ storage: storage })

testimonialroutes.post("/insert",upload.single("testiImage"),testimonialinsert)
testimonialroutes.get("/view",testimonialview)
testimonialroutes.post("/delete",testimonialdelete)
testimonialroutes.put("/change-status/:id",changeStatus)

export default testimonialroutes