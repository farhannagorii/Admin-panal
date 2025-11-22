import mongoose from "mongoose";

let WhyChooseUsSchema = mongoose.Schema({
       titleName:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
     Order:String,
     discription:String,
     titleImage:String,
     titleStatus:{
        type:Boolean,
        default:true
     }

},{timestamps:true})

let WhyChooseUsModel= mongoose.model("WhyChooseUs",WhyChooseUsSchema)

export default WhyChooseUsModel