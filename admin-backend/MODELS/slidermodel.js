import mongoose from "mongoose";


let sliderschema = mongoose.Schema({
    sliderName:{
        type:String,
        required:true
    },
    sliderOrder:{
        type:String,
        required:true
    },
    sliderStatus:Boolean
})

let slidermodel = mongoose.model("slider",sliderschema)

export default slidermodel
