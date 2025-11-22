import mongoose from "mongoose";

let materialschema = mongoose.Schema({
      materialName:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
     materialOrder:Number,
     materialStatus:{
      type:Boolean,
      default:true
     }
},{timestamps:true})

let materialmodel = mongoose.model("material",materialschema)
export default materialmodel