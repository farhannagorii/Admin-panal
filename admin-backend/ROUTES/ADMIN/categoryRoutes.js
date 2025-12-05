import express from "express"
import { categorydelete, categoryinsert, categorystatus, categoryview, editdata, updatedata } from "../../CONTROLLERS/ADMIN/categoryController.js"
import multer from "multer"
import path  from "path"
let categoryroutes = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname+ "-" +  Date.now() + file.originalname)
  }
}) 

const upload = multer({ storage: storage })


categoryroutes.post("/insert",upload.single('categoryImage'),categoryinsert)

categoryroutes.get("/view",categoryview)
categoryroutes.put("/change-status/:id",categorystatus)
categoryroutes.get("/edit-row-data/:id",editdata)
categoryroutes.put("/update/:id",upload.single('categoryImage'),updatedata)
categoryroutes.post("/delete",categorydelete)



export default categoryroutes