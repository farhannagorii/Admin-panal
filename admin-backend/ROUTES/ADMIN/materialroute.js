import express from "express"
import { deletematerial, insertmaterial, viewmaterial } from "../../CONTROLLERS/ADMIN/materialcontroller.js"

let materialroutes = express.Router()

materialroutes.post("/insert",insertmaterial)
materialroutes.get("/view",viewmaterial)
materialroutes.post("/delete",deletematerial)

export default materialroutes