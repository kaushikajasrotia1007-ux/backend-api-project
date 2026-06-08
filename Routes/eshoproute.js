const { Router } = require("express");
const adminmodel = require("../models/adminmodel");

const eshoproute=Router()


eshoproute.get('/',function(req,res){
    res.render("e-shop/home");
})

eshoproute.get('/contact',function(req,res){
    res.render("e-shop/contact")
})

eshoproute.get('/about',function(req,res){
    res.render("e-shop/about")
})

eshoproute.get('/product',function(req,res){
    res.render("e-shop/product")
})

eshoproute.get('/productfile',function(req,res){
    res.render("e-shop/productfile")
})

const table= [{name:"john"},{name:"riya"},{name:"harsh"}]

eshoproute.get('/table',function(req,res){
    res.render("e-shop/table",{table})
})

eshoproute.get('/form',function(req,res){
    res.render("e-shop/form")
})

eshoproute.post('/addData',function(req,res){
    console.log(req.body);
    res.send("posted")
})

// eshoproute.get('/register',function(req,res){
//     res.render("e-shop/register")
// })

// eshoproute.post('/Registerdata',function(req,res){
//     console.log(req.body);
//     let admin=new adminmodel(req.body)
//     admin.save()
//     res.send("your entry is register now")
// })





module.exports=eshoproute