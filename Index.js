
const express=require('express');
const eshoproute = require('./Routes/eshoproute');
const Reciperoute = require('./Routes/Reciperoute');
const app=express();
var mongoose=require("mongoose")
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');


const sessionchecker=(req,res,Next)=>{
   if (req.session.adminId){
      Next()
   }else{
      res.redirect("/adminlogin")
   }
}


app.use(session({
   secret: 'sample-secret',
   resave: false,
   saveUninitialized: false
}));


app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});



app.get('/', function(req, res){
   res.cookie('name', 'express').send('cookie set'); //Sets name = express
});


try{
    mongoose.connect("mongodb://localhost:27017/ecom")
    console.log("mongo db connected!")

}catch(err){
    console.log(err);
}




var bodyParser = require('body-parser');
const loginRoute = require('./Routes/loginroute');
const adminroute = require('./Routes/Adminroute');
const corsroute = require('./Routes/corsroute');
var cors = require('cors')
require('dotenv').config()


let PORT=process.env.PORT

console.log(process.env.PORT)


const corsOptions = {
  origin: 'http://localhost:5173', // Allowed domain
  methods: ['GET', 'POST'],        // Allowed HTTP verbs
  allowedHeaders: ['Content-Type' ], // Custom headers

};

app.use(cors(corsOptions))


//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))




//To parse json data
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'))
app.use("/eshop",eshoproute)
app.use("/admin",sessionchecker,adminroute)
app.use("/recipe",Reciperoute)
app.use("/",loginRoute)
app.use("/cors",corsroute)






const server=app.listen(3000)