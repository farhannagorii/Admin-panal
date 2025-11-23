import mongoose  from "mongoose";

let subcategorySchema = mongoose.Schema({


    subcategoryname:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
    subcategoryimage:String,
    subcategorystatus:{
        type:Boolean,
        default:true
    },
    parentcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategoryorder:Number

},{ timestamps:true})

let subcategoryModel  =  mongoose.model("subcategory",subcategorySchema)
export default subcategoryModel