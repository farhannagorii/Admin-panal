import express from "express"
import { sliderinsert, sliderview } from "../../CONTROLLERS/ADMIN/slidercontroller.js"
import multer from "multer"

let sliderroutes = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/slider')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname+ "-" +  Date.now() + file.originalname)
  }
}) 

const upload = multer({ storage: storage })


sliderroutes.post("/insert",upload.single("sliderImage"),sliderinsert)
sliderroutes.get("/view",sliderview)

export default sliderroutes