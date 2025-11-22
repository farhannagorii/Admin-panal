import mongoose  from "mongoose";

let categorySchema = mongoose.Schema({


    categoryName:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
    categoryImage:String,
    categoryStatus:{
        type:Boolean,
        default:true
    },
    categoryOrder:Number

},{ timestamps:true})

let categoryModel  =  mongoose.model("category",categorySchema)
export default categoryModel