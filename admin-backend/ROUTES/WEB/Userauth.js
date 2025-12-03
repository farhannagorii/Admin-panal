import express from "express"
import multer from "multer"
import { checkOtp, login, userRegister } from "../../CONTROLLERS/WEB/webauthcontroller.js"
let uploads = multer({storage:""})
let authroutes = express.Router()

authroutes.post("/register",uploads.none(),userRegister)
authroutes.post("/check-otp",checkOtp)
authroutes.post("/login",login)

export default authroutes