//jshint esversion:6
require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require('md5');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/userDB");


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


// console.log(process.env.API_KEY);

// userSchema.plugin(encrypt,{secret: process.env.SECRET, encryptedFields:["password"]});

const User = new mongoose.model('User' , userSchema);


app.get('/' , function(req , res){

    res.render("home");
});

app.get('/login' , function(req , res){

    res.render('login');
});

app.get('/register' , function( req , res){

    res.render('register');
});


app.post('/register' , function(req , res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const newUser = new User({
            email: req.body.username , 
            password: hash   //If you want to use the md5 ==>  md5(req.body.password)
        })
    
        newUser.save(function(err){
            if(err){
                console.log(err)
            }else{
                res.render('secrets')
            }
        });
    });

    
})

app.post('/login', function(req , res){

    const email = req.body.username
    const password = md5(req.body.password)

    User.findOne({email: email} , function(err , foundUser){
        if(err){
            console.log(err)
        }else{
            if(foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result == true ){
                        res.render('secrets')
                    }
                });
                 
            }
        }
    })
})

app.listen(3001 , function(){

    console.log("The server are running on port 3001")
});
