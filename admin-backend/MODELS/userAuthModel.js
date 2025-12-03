import mongoose, { mongo } from "mongoose";

let userSchema = mongoose.Schema({
    userName: {
        type: String,
        maxlength: 20,
        minlength: 3,
    },
    userEmail:{
       required:true,
    //    unique:true,
       type:String
    },
    userAddressh:{
       type:String,
    },
    userPhone:{
        type:Number
    },
    userPassword: {
        type: String,
    },
    userPhoto:{
        type:String
    },
}, { timestamps: true })

let userModel = mongoose.model("user", userSchema)
export default userModel