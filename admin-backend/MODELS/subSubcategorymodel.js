import mongoose  from "mongoose";

let subsubcategorySchema = mongoose.Schema({


    subsubcategoryname:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
    subsubcategoryimage:String,
    subsubcategorystatus:{
        type:Boolean,
        default:true
    },
    parentcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subparentcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    subsubcategoryorder:Number

},{ timestamps:true})

let subsubcategoryModel  =  mongoose.model("subsubcategory",subsubcategorySchema)
export default subsubcategoryModel