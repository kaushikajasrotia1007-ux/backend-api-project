const { default: mongoose } = require("mongoose");

const productschema=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    rating:Number,
    category:String,
    image:String
    
});

const productModel=mongoose.model("product",productschema)

module.exports=productModel;