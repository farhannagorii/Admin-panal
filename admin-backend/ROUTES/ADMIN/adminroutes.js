import express from "express"
import colorroutes from "./colorroutes.js"
import materialroutes from "./materialroute.js"
import categoryroutes from "./categoryRoutes.js"
import WhyChooseUsroute from "./WhyChooseUsroute.js"
import testimonialroutes from "./testimonialroute.js"
import sliderroutes from "./sliderroutes.js"
import subcategoryroutes from "./subcategoryroutes.js"
import subSubcategoryroutes from "./subSubcategoryRoutes.js"
import loginRoutes from "./loginRoute.js"
import productsroutes from "./productroutes.js"


let adminroutes = express.Router()

adminroutes.use("/color",colorroutes)
adminroutes.use("/material",materialroutes)
adminroutes.use("/category",categoryroutes)
adminroutes.use("/story-detail",WhyChooseUsroute)
adminroutes.use("/testimonial",testimonialroutes)
adminroutes.use("/slider",sliderroutes)
adminroutes.use("/subcategory",subcategoryroutes)
adminroutes.use("/subsubcategory",subSubcategoryroutes)
adminroutes.use("/auth",loginRoutes) 
adminroutes.use("/products",productsroutes) 

export default adminroutes