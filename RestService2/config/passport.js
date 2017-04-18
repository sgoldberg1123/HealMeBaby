// database connection, JWT secret and configuration
var connection = require('./dbConn');
var passport = require('passport');
var jwt = require("passport-jwt");
var JWTStrategy = jwt.Strategy;
var ExtractJWT = jwt.ExtractJwt;
var config = require('./config');
var params = {
  secretOrKey: config.jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJWT.fromBodyField('JWT')
};

// expose this function to our app using module.exports
module.exports = function(passport) {
  //jwt Strategy
  passport.use(new JWTStrategy(params, function(payload, done){
    connection.query('Select * from health.user WHERE user_id = ?',[payload.id], function(err,rows){
      if(err){
        return done(err);
      }
      if(!rows.length){
        return done(null, false, req.flash('loginMessage', 'Couldn\'t find user'));
      }
      var newLogin = new Object();
      newLogin.user_id = rows[0].user_id;
      newLogin.name = rows[0].first_name;
      return done(null, newLogin);
    });
  }));
};
