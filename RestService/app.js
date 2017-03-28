// config and package imports ===================================================
var express = require('express');                 // nodejs framework
var port = 8080;                                  // port
var passport = require('passport');               // authentication middleware
var flash = require('connect-flash');             // auth error messages through passport
var morgan = require('morgan');                   // console logging logging
var cookieParser = require('cookie-parser');      // parse cookie info
var bodyParser = require('body-parser');          // parse body and html forms
var session = require('express-session');         // web session info
var MySQLStore = require('express-mysql-session')(session);   // store sessions
var options = require('./config/config');       // database connection info
var sessionStore = new MySQLStore(options.sess);  // session storage in db
require('./config/passport')(passport);           // passport configuration


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

// session ===============================
// initializing session and passport with mysql storage
app.use(session(options.session));
app.use(passport.initialize());
app.use(passport.session());        // persistent login sessions
app.use(flash());   // use connect-flash for flash messages stored in session

// routes ================================
// Note: this is done after session initialization for a reason
// load our routes
require('./routes/routes.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
