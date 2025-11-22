import mongoose, { mongo } from "mongoose";

let colorSchema = mongoose.Schema({


    colorName:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
     colorCode:String,
    colorStatus:{
        type:Boolean,
        default:true
    },
    colorOrder:Number

},{ timestamps:true})

let colorModel  =  mongoose.model("color",colorSchema)
export default colorModel