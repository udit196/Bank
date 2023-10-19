//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const html=require("html");
const mongoose=require("mongoose");
const path=require("path");
require('dotenv').config('./.env')

const apiKey= process.env.apiKey
const authDomain= process.env.authDomain
const databaseURL= process.env.databaseURL
const projectId= process.env.projectId
const storageBucket= process.env.storageBucket
const messagingSenderId= process.env.messagingSenderId
const appId= process.env.appId
const app=express();

app.use(express.static("public"));
// app.set('view engine','ejs');
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/userDB',{useNewUrlParser:'true'});

const userSchema={
    email:String,
    password:String
};

const User= new mongoose.model("User",userSchema);


app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

app.get("/register",(req,res)=>{
    res.render("register.ejs");
});

app.post("/register",(req,res)=>{
    console.log(req.body);
    const newUser= new User({
        email :  req.body.username,
        password:req.body.password
    });

    newUser.save().then(()=>{
        res.render('home.ejs');
    })
    .catch((err)=>{
        console.log("Error: koi to gadbad hai");
    })
});

app.get("/login/home",(req,res)=>{
    res.render('home.ejs');
})
app.get("/login/accounts",(req,res)=>{
    res.render('accounts.ejs',{apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId,appId});
})
app.get("/login/customers",(req,res)=>{
    res.render('customers.ejs',{apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId,appId});
})
app.get("/login/transactions",(req,res)=>{
    res.render('transactions.ejs');
})
app.get("/login/about",(req,res)=>{
    res.render('about.ejs');
})
app.get("/login/abc",(req,res)=>{
    res.render('abc.ejs',{apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId,appId});
})

app.get("/login/add_customer",(req,res)=>{
    res.render('add_customer.ejs',{apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId,appId});
})

app.post("/login",(req,res)=>{
    const username =  req.body.username;
    const password = req.body.password;

    User.findOne({email : username}).then((foundUser) => {
            if(foundUser.password===password){
                res.render('home.ejs');
            }
            else{
                res.render("login.ejs");
            }
        })
        .catch((err)=>{
            console.log(err);
        })     
});
// const port=process.env.PORT || 80
// app.listen(80,function(){
//     console.log("Server started successfully on port 80");
// });

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});