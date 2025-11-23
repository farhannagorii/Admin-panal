import express from "express"
import { deletecatdata, getparentcategory, getsubcategory, insertsubcategory, updatestatus } from "../../CONTROLLERS/ADMIN/subcategorycontroller.js"
import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subcategory')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname+ "-" +  Date.now() + file.originalname)
  }
}) 

const upload = multer({ storage: storage })

let subcategoryroutes = express.Router()

subcategoryroutes.get("/parent-category",getparentcategory)
subcategoryroutes.post("/insert",upload.single("subcategoryImage"),insertsubcategory)
subcategoryroutes.get("/view",getsubcategory)
subcategoryroutes.post("/delete",deletecatdata)
subcategoryroutes.put("/update/:id",updatestatus)
// subcategoryroutes.put("/editdata/:id",updateeditdata)


export default subcategoryroutes