# Authentication-Security


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#Project-setup)
* [How to setup the passport-google-oauth2](#How-to-setup-the-passport-google-oauth2)

## General info
This project is simple Signup &amp; Sign-in form with mongoDB, Database Encryption, Hashing Password, OAuth 2.0.
	
## Technologies
Project is created with:
* node version: v16.13.2
* ejs version: 3.1.6
* bootstrap version: 4.2.1
* mongoDB
	
## Project Setup
To run this project, install it locally using npm:

```
$ cd ../Authentication-Security
$ npm install express
$ npm install ejs
$ npm install body-parser
$ npm install mongoose
$ npm install express-session
$ npm install passport
$ npm install passport-local-mongoose
$ npm install passport-google-oauth2
```






# How to setup the passport-google-oauth2

1- You have to install the package:

Install:

$ npm install passport-google-oauth2

```
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
```


Before using `passport-google-oauth20` , you must register an application with Google. If you have not already done so, a new project can be created in the [Google Developers Console](https://console.cloud.google.com/projectselector2/apis/dashboard?pli=1&supportedpurview=project). Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will a;so need to configure a redirect URI which matches the route in your application.



1. You have to click on **OAuth consent screen**.
   - As you see in the below image
 
![image](https://user-images.githubusercontent.com/51037193/149899463-dc51cdce-9201-440c-b458-64893d54b35f.png)


2. Create Project

![image](https://user-images.githubusercontent.com/51037193/149900070-96479cec-bd78-42bd-9a7d-4aad185e37ac.png)



3. You have to name your project.
 - If you give a name of you project then you can leave everything else then click **Create**.
  
![image](https://user-images.githubusercontent.com/51037193/149900877-7686bbde-f9bc-414c-ab3b-aac6bad35db4.png)


4. setup project credentials
 - And we're simply going to configure the screen that user sees when they login through Google and grant your application access to their data. So it's helpful for them to know what application they're talking about
  ![image](https://user-images.githubusercontent.com/51037193/149902630-a62438ac-53bc-4674-bb07-c8fb71ffe972.png)
  
 - Project Scope
    - And here the fields that you will receive once the user logsin through Google, in our case we are intrested in **email , profile , openid**.
  
    
   ![image](https://user-images.githubusercontent.com/51037193/149904271-acacda06-9e9b-4cfc-9dda-0a57357c523b.png)

   ![image](https://user-images.githubusercontent.com/51037193/149905687-a2effbcb-7b78-4a43-ba70-2795c8e23349.png)
   
   
   - In **Test user** just click **Save and continue**







4. Now we will **create API credentials**.
 - **Create OAuth client ID**, is going to allow us to authenticate them using Google.
 
 
   ![image](https://user-images.githubusercontent.com/51037193/149926712-f5a23282-388f-4a06-b12d-d3af964e9277.png)



 - In our case We will choise web application.
 
   ![image](https://user-images.githubusercontent.com/51037193/149927279-ac4abb3e-a6a3-4dd5-beb1-474c5330f232.png)


 - **Authorised JavaScript origins**
   - Origin, so where is that request to Google going to come from. And in our case it's going to come from our local host `http://localhost:3000`.
     ![image](https://user-images.githubusercontent.com/51037193/149928580-485aee40-8d6e-4b1e-a4f0-94e425afe259.png)

 - **Authorised redirect URIs** 
   - This is a route that we're going to plan out on our server when Google has authenticated our user to return to so that we can then locally authenticate them and save the session and cookies and all of that, in our case the **Authorised redirect URIs** will be `http://localhost:3000/auth/google/secrets` then click **Create**.
   
   ![image](https://user-images.githubusercontent.com/51037193/149929793-7002f3f8-d579-4998-b0aa-8c1eba3a8d89.png)
   
   - Then the **OAuth client created**.
   
   ![image](https://user-images.githubusercontent.com/51037193/149930460-95291478-797e-4c82-b962-05f132ce9a93.png)

**You have to keep your "Client ID & Your Client Secret" secret, You have to put that to .env file**







5. [Passport strategy for Google OAuth 2.0](http://www.passportjs.org/packages/passport-google-oauth2/)

 - This code below from the Passport strategy for Google OAuth 2.0 Documentation.
```
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```

  - The code below after i changed it for our case.
```
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```
