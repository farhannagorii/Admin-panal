
import express from "express"
import { detailinsert, titledata, titledelete, titleUpdate, titleview } from "../../CONTROLLERS/ADMIN/whychooseUscontroller.js"
import multer from "multer"
let WhyChooseUsroute = express.Router()



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/storydetails')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname+ "-" +  Date.now() + file.originalname)
  }
}) 

const upload = multer({ storage: storage })

WhyChooseUsroute.post("/insert",upload.single("titleImage"),detailinsert)
WhyChooseUsroute.get("/view",titleview)
WhyChooseUsroute.get("/title-data/:id",titledata)
WhyChooseUsroute.put("/update/:id",upload.single('titleImage'),titleUpdate)
WhyChooseUsroute.post("/delete",titledelete)


export default WhyChooseUsroute