const { default: mongoose } = require("mongoose");



const adminSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    otp:String,
    
})
const adminModel=mongoose.model("admin",adminSchema)


module.exports=adminModel