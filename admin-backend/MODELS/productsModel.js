import mongoose from "mongoose";

let productsschema = mongoose.Schema({
    Prodct_Name: {
        type: String,
        maxlength: 20,
        minlength: 3,
        required: true
    },
    Parent_Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    Sub_Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    Sub_Sub_Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subsubcategory"
    },
    Meterial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "material"
    },
    Color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "color"
    },
    productType:{
        type:Number,
        enum:[1,2,3],
    },
    Selling:Boolean,
    Rated:Boolean,
    Upsell:Boolean,
    Actual_Price:Number,
    Sale_Price:Number,
    Stocks:Number,
    Order:Number,
    productdescription:String,
    productimage:String,
    productBackimage:String,
    productgallery:Object

}, { timestamps: true })

let productsmodel = mongoose.model("products", productsschema)
export default productsmodel