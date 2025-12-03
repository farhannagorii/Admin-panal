
import express from "express"
import { changepassword, loginUser } from "../../CONTROLLERS/ADMIN/loginController.js"
let loginRoutes= express.Router()

loginRoutes.post("/login",loginUser)
loginRoutes.put("/change-password/:userid",changepassword)


export default loginRoutes

