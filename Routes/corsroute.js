const { Router } = require ("express");
const productModel= require("../models/productmodel");
const categoryModel = require("../models/categorymodel");
const corsroute=Router()


corsroute.get("/",(req,res)=>{
    res.send("hello")
})


corsroute.get("/allproducts",async(req,res)=>{
    let products= await productModel.find()
    res.json(products)
})

corsroute.get("/allcategory",async(req,res)=>{
    let category= await categoryModel.find()
    res.json(category)
})

corsroute.get("/categories/:id",async(req,res)=>{
    const id =req.params.id
     let products= await productModel.find({category:id})
    res.json(products)
})


corsroute.get("/singleproduct/:id",async(req,res)=>{
    let products= await productModel.findById(req.params.id)
    res.json(products)
})

corsroute.get("/search/:search", async(req,res)=>{
    let product = await productModel.find({
        name:{$regex :req.params.search, $options:"i"}

    })
    console.log(product);
    res.json(product)

})




module.exports=corsroute