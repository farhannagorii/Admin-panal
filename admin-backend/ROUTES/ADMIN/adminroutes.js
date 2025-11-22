import express from "express"
import colorroutes from "./colorroutes.js"
import materialroutes from "./materialroute.js"
import categoryroutes from "./categoryRoutes.js"
import WhyChooseUsroute from "./WhyChooseUsroute.js"
import testimonialroutes from "./testimonialroute.js"


let adminroutes = express.Router()

adminroutes.use("/color",colorroutes)
adminroutes.use("/material",materialroutes)
adminroutes.use("/category",categoryroutes)
adminroutes.use("/story-detail",WhyChooseUsroute)
adminroutes.use("/testimonial",testimonialroutes)

export default adminroutes