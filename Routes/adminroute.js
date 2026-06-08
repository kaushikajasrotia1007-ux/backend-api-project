const { Router } = require("express");
const categoryModel = require("../models/categorymodel");
const productModel= require("../models/productmodel");
const adminroute=Router()



const multer  = require('multer');
// const demoModel = require('./models/demomodel');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+".jpg"
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



const nodemailer = require("nodemailer");
const adminModel = require("../models/adminmodel");


  adminroute.get("/email",(req,res)=>{
    res.render("admin/emailform")
})

// Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kaushikajasrotia1007@gmail.com",
      pass: "deru qsuk tlli vgfg",
    },
  });

adminroute.post("/sendemail",(req,res)=>{
     const mailOptions = {
    from:"kaushikajasrotia1007@gmail.com" ,
    to: req.body.email,
    subject: req.body.subject,
    html:`<h1> Name: ${req.body.name}  Email: ${req.body.email} Message: ${req.body.message} </h1> `
     
  };
  transporter.sendMail( mailOptions)
  .then(res=>console.log(res))
  .catch(err=>console.log(err))
  .finally(()=>{
 res.send("mail sent!check your inbox")
  })

})







// app.get ("/demoform",(req,res)=>{
// res.render("demoform")
// })

// app.post('/postdemo', upload.single('image'), async (req, res)=> {
//    let obj={...req.body,image:req.file.filename}
//    const model=await demoModel(obj);
//     model.save();
//    res.send("saved!");
 
// })




adminroute.get('/',function (req,res) {
    res.render("admin/dashboard")
})

adminroute.get('/home',function (req,res) {
    res.send("admin home page")
})


adminroute.get("/product",async(req,res)=>{
    const category = await categoryModel.find()
     const product = await productModel.find()
    res.render("admin/product",{category,product})
})

adminroute.post("/addcategory",(req,res)=>{
    const category = new categoryModel(req.body)
    category.save()
    res.redirect("/admin/product")
})

adminroute.post("/updatecategory",async(req,res)=>{
    const category = await categoryModel.findByIdAndUpdate(req.body.oldcategoryId,{name:req.body.name})
    res.redirect("/admin/product")
})

adminroute.post("/deletecategory",async(req,res)=>{
    console.log(req.body)
    const category = await categoryModel.findByIdAndDelete(req.body._id)
    res.redirect("/admin/product")
})


adminroute.post("/addproduct",upload.single("image") ,async(req,res)=>{
    const product = new productModel({
       ... req.body,
        image:req.file.filename
    })
     await product.save()
    res.redirect("/admin/product")
})

adminroute.post("/deleteproduct",async(req,res)=>{
    console.log(req.body)
    const product = await productModel.findByIdAndDelete(req.body._id)
    res.redirect("/admin/product")
})


adminroute.get("/updateproduct/:id",async(req,res)=>{
    const id= req.params.id;
    let category=await categoryModel.find()
     const product = await productModel.findById(id)
    res.render("admin/updateproduct",{product,category})
})


adminroute.post("/updateproduct/:id",async(req,res)=>{
    const product = await productModel.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/admin/product")
})

adminroute.get("/addproduct",async(req,res)=>{
    let name=req.query.name
    let category=await categoryModel.find()
    res.render("admin/addproduct",{category,name})
})





















module.exports = adminroute