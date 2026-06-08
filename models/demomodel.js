const { default: mongoose } = require("mongoose");

const demoschema=mongoose.Schema({
    name:String,
    image:String
    
});

const demoModel=mongoose.model("demo",demoschema)

module.exports=demoModel;