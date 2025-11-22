import express from "express"
import authroutes from "./Userauth.js"

let webroutes = express.Router()

webroutes.use("/user",authroutes)

export default webroutes