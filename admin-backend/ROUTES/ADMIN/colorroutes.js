import express from "express"
import { deletecolor, insertcolor, viewcolor } from "../../CONTROLLERS/ADMIN/colorcontroller.js"


let colorroutes = express.Router()

colorroutes.post("/insert",insertcolor)
colorroutes.get("/view",viewcolor)
colorroutes.post("/delete",deletecolor)

export default colorroutes