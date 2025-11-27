
import express from "express"
import { deletecatedata, getparentcategory, getsubcategorydata, insertsubsubcat, updatestatus, viewsubsubdata } from "../../CONTROLLERS/ADMIN/subSubcategorycontroller.js"
import multer from "multer"



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subsubcategory')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname+ "-" +  Date.now() + file.originalname)
  }
}) 

const upload = multer({ storage: storage })


let subSubcategoryroutes=express.Router()

subSubcategoryroutes.get("/parent-category",getparentcategory)
subSubcategoryroutes.get("/subparent-category/:pid",getsubcategorydata)
subSubcategoryroutes.post("/insert",upload.single("subsubcategoryimage"),insertsubsubcat)
subSubcategoryroutes.get("/view",viewsubsubdata)
subSubcategoryroutes.post("/delete",deletecatedata)
subSubcategoryroutes.put("/update/:id",updatestatus)

export default subSubcategoryroutes