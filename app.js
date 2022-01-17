//jshint esversion:6
require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const saltRounds = 10;

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret:"Our little secret",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB");
// mongoose.set("useCreateIndex" , true);


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
// console.log(process.env.API_KEY);

// userSchema.plugin(encrypt,{secret: process.env.SECRET, encryptedFields:["password"]});

const User = new mongoose.model('User' , userSchema);

passport.use(User.createStrategy());


// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


app.get('/' , function(req , res){

    res.render("home");
});

app.get('/login' , function(req , res){

    res.render('login');
});

app.get('/register' , function( req , res){

    res.render('register');
});

app.get('/secrets' , function(req , res){

    if(req.isAuthenticated()){
        res.render('secrets');
    }else{
        res.redirect('login')
    }
})

app.post('/register' , function(req , res){

    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     const newUser = new User({
    //         email: req.body.username , 
    //         password: hash   //If you want to use the md5 ==>  md5(req.body.password)
    //     })
    
    //     newUser.save(function(err){
    //         if(err){
    //             console.log(err)
    //         }else{
    //             res.render('secrets')
    //         }
    //     });
    // });

    User.register({username: req.body.username}, req.body.password , function(err , user){
        if(err){
            console.log(err)
            res.redirect('/secrets')
        }else{
            passport.authenticate("local")(req  , res , function(){
                res.redirect('/secrets')
            })
        }
    })

    
})

app.post('/login', function(req , res){

    // const email = req.body.username
    // const password = md5(req.body.password)

    // User.findOne({email: email} , function(err , foundUser){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         if(foundUser){
    //             bcrypt.compare(password, foundUser.password, function(err, result) {
    //                 if(result == true ){
    //                     res.render('secrets')
    //                 }
    //             });
                 
    //         }
    //     }
    // })

    const user = new User({
        email: req.body.username,
        password: req.body.password
    })
  //This is function built in throw this documentation for passport package ==>  https://www.passportjs.org/docs/login/
    req.logIn(user , function(err){
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req , res , function(){
                res.redirect('/secrets')
            })
        }
    })
})

app.get('/logout' , function(req , res){

    req.logout();
    res.redirect('/')
})

app.listen(3001 , function(){

    console.log("The server are running on port 3001")
});
