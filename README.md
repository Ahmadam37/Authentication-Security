# Authentication-Security
Signup &amp; Sign in form with mongoDB, Database Encryption, Hashing Password, OAuth 2.0

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple Signup &amp; Sign-in form with mongoDB, Database Encryption, Hashing Password, OAuth 2.0.
	
## Technologies
Project is created with:
* node version: v16.13.2
* ejs version: 3.1.6
* bootstrap version: 4.2.1
* mongoDB
	
## Setup
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

