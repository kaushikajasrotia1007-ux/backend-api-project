const { Router } = require("express");

const Reciperoute=Router()

Reciperoute.get('/',function(req,res){
    res.send("<h1>Recipe</h1>");
})

Reciperoute.get('/contact',function(req,res){
    res.send("<h1>contact info</h1>")
})

Reciperoute.get('/home',function(req,res){
    res.send("<h1> recipe home page</h1>")
})



module.exports=Reciperoute