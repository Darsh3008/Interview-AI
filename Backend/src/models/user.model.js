const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:[true , "username already taken"],
            required:true
        },
        email:{
            type:String,
            unique:[true, "email already exists"],
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true
        }
    },
    {
        timestamps: true
    }
)
 const userModel = mongoose.model("User" ,userSchema)
 module.exports = userModel