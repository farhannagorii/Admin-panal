import mongoose, { mongo } from "mongoose";

let loginSchema = mongoose.Schema({


    loginName: {
        type: String,
        maxlength: 20,
        minlength: 3,
        required: true
    },
    loginPassword: {
        type: String,
    },

}, { timestamps: true })

let loginModel = mongoose.model("login", loginSchema)
export default loginModel