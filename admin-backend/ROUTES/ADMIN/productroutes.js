import express from "express"
import { getcolor, getparentcategory, getsubcategory, getsubsubcategory, meterial, productinsert } from "../../CONTROLLERS/ADMIN/productController.js"
import multer from "multer"

let productsroutes = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname+ "-" +  Date.now() + file.originalname)
  }
}) 

const upload = multer({ storage: storage })

let cpuploads = upload.fields(
    [
        {name:'ProductImage',maxCount:1},
        {name:'backImage',maxCount:1},
        {name:'GalleryImage',maxCount:10},
    ]
)

productsroutes.get("/parentcategory",getparentcategory)
productsroutes.get("/subcategory/:pid",getsubcategory)
productsroutes.get("/subsubparentcategory/:id",getsubsubcategory)
productsroutes.get("/color",getcolor)
productsroutes.get("/material",meterial)
productsroutes.post("/insert",cpuploads,productinsert)

export default productsroutes