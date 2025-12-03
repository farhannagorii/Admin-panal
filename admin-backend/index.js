import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
import dbconnect from "./config/Database.js"
import adminroutes from "./ROUTES/ADMIN/adminroutes.js"
import webroutes from "./ROUTES/WEB/webroutes.js"
import loginModel from "./MODELS/authModel.js"
let app = express()
app.use("/uploads/category",express.static("uploads/category"))
app.use("/uploads/storydetails",express.static("uploads/storydetails"))
app.use("/uploads/subcategory",express.static("uploads/subcategory"))
app.use("/uploads/subsubcategory",express.static("uploads/subsubcategory"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
let PORT = 3000

app.use("/admin",adminroutes)
app.use("/web",webroutes)

app.listen(PORT,async()=>{
    dbconnect()
     console.log("server is running on 3000")

 let checkadmindata = await loginModel.find()

 if(checkadmindata.length==0){
    let obj={
        loginName:"farhannagori",
        loginPassword:"123456789"
    }
    await loginModel.insertOne(obj)
 }
})