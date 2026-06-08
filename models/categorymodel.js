const { default: mongoose } = require("mongoose");

const categoryschema=mongoose.Schema({
    name:String
})

const categoryModel=mongoose.model("category",categoryschema)

module.exports=categoryModel