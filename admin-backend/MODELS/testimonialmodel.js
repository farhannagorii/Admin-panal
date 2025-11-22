import mongoose from "mongoose";

let testimonialSchema = mongoose.Schema({
    testiName:{
        type:String,
        required:true,
    },
    Designation:{
        type:Number,
        required:true
    },
    Rating:{
        type:String,
        required:true
    },
     Order:{
        type:String,
        required:true
     },
     Message:{
        type:String,
        required:true
     },
     testiImage:{
        type:String
     },
     testistatus:{
        type:Boolean,
        default:true
     }
},{timestamps:true})

let testimonialmodel = mongoose.model("testimonial",testimonialSchema)
export default testimonialmodel