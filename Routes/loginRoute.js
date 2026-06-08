const { Router } = require("express");
const adminModel = require("../models/adminmodel");

const loginRoute=Router()
const nodemailer = require("nodemailer");
const bcrypt= require("bcrypt");





loginRoute.get("/eshop/login",(req,res)=>{
    res.render("e-shop/login")

})

loginRoute.get("/eshop/register",(req,res)=>{
    res.render("e-shop/register")

})

loginRoute.get("/adminlogin",function(req,res){
    res.render("admin/adminlogin")
})

loginRoute.get("/adminregister", (req, res) => {
    let msg = ""
    if(req.query){
        msg = req.query.msg
    }
    
    res.render("admin/adminRegister",{msg:msg})
})


loginRoute.post("/adminregister",async (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        let existingAdmin=await adminModel.findOne({email:req.body.email});
        if (existingAdmin){
            return res.redirect("/adminregister?msg=emailalreadyexists");
        }

        let admin = new adminModel(req.body)
        admin.save()
        req.session.adminId=admin._id
        res.redirect("/admin")
    } else {
        res.redirect("/adminregister?msg=passnotconfirm")
    }

})


loginRoute.post("/adminlogin",async(req,res)=>{
    let admin= await adminModel.findOne(req.body)
    if (admin){
      req.session.adminId=admin._id
       res.redirect("/admin")

    }else{
        res.redirect("/adminlogin")
    }
})

loginRoute.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/adminlogin")
})




loginRoute.get("/forgotpassword",(req,res)=>{
   let msg = ""
    if(req.query){
        msg = req.query.msg
    }
  res.render("admin/forgotform",{msg:msg})
})




const transporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"kaushikajasrotia1007@gmail.com",
    pass:"deru qsuk tlli vgfg"
  }  
})

loginRoute.post("/changepass",async(req,res)=>{

  const admin=await adminModel.findOne({email:req.body.email})
if (admin) {
     const otp = Math.floor(100000 + Math.random() * 900000);
     admin.otp=otp
     admin.save()

     let mailoptiopn={
        from:"kaushikajasrotia1007@gmail.com",
        to:req.body.email,
        subject:req.body.subject,
        html:`<h1>Name:${req.body.name} Email:${req.body.email} Resetpassward:${otp}</h1>`
    }
    transporter.sendMail(mailoptiopn)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(()=>{
        req.session.otp=otp
         req.session.adminEmailId=admin.email
       res.render("admin/verifyotp")
    })


}else{
  res.redirect("/forgotpassword?msg=emailnotexixts")
}
})

loginRoute.post("/verifyotp",async(req,res)=>{
    const {otp}=req.body

    console.log(req.body);
    console.log(req.session.otp);
    
     const admin=await adminModel.findOne({email :req.session.adminEmailId})

     if (req.session.otp == otp) {
        req.session.isOtpverified = true;
       
        res.render("admin/resetpassward",{error:null})
        
     } else {
       res.redirect("/forgotpassword?msg=otpnotvalid")
        
     }
})


loginRoute.post("/resetpassword",async(req,res)=>{
    if (!req.session.isOtpverified){
        return res.send("unauthorized");
    }

    const {newPassword,confirmPassword}=req.body
    if (newPassword !== confirmPassword){
        return res.render("admin/resetpassward",
           { error:"password do not match"
    })
    }
    const admin=await adminModel.findOne({
        email:req.session.adminEmailId
    });
    const hashedPassword = await bcrypt.hash(newPassword,10);
    admin.password= hashedPassword;

    await admin.save();

    req.session.destroy();

    res.redirect("/adminlogin")
})







module.exports = loginRoute






