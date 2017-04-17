// config and package imports ===================================================
var express = require('express');                 // nodejs framework
var port = 8090;                                  // port
var passport = require('passport');               // authentication middleware
var morgan = require('morgan');                   // console logging logging
var cookieParser = require('cookie-parser');      // parse cookie info
var bodyParser = require('body-parser');          // parse body and html forms
var config = require('./config/config');       // database connection info
var router = require('./routes');

// set up application ===========================================================
var app = new express();
app.use(morgan('dev'));             // console logging tool
app.use(cookieParser());            // read cookies
app.use(bodyParser.urlencoded({     // Needed to parse request bodies
  extended: true
}));
app.use(bodyParser.json());         // get information from html forms
app.set('view engine', 'ejs');      // set up ejs for templating

// public files ==========================
// js, css, etc served in public folder
// Note: this is done before session initialize so when these files are
// accessed a session is not created
app.use(express.static('./public'));

//initialize authentication middleware
app.use(passport.initialize());

// routes ================================
app.use(router);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
