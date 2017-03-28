// database connection and passport dependencies
var connection = require('./dbConn');
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.user_id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(user_id, done) {
    connection.query('select * from health.user where user_id = ?',[user_id],function(err,rows){
      done(err, rows[0]);
    });
  });


  // =========================================================================
  // Authentication Methods
  // =========================================================================
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    // find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
    connection.query('SELECT * from health.user where email = ?',[email],function(err,rows){
      if (err)
        return done(err);
      if (rows.length) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      }
      else {
        // if there is no user with that email create one
        var newUserMysql = new Object();
        var insertQuery = 'INSERT INTO health.user ( email, password, first_name, last_name ) values (?,?,?,?)';
        connection.query(insertQuery,[email, password, req.body.firstName, req.body.lastName],function(err,rows){
          newUserMysql.user_id = rows.insertId;
          return done(null, newUserMysql);
        });
      }
    });
  }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    //try to find a user that has the same email and password
    connection.query('SELECT * FROM health.user WHERE email = ?',[email], function(err,rows){
      if (err){
        return done(err);
      }
      // no match
      // req.flash is the way to set flashdata using connect-flash
      if (!rows.length)
        return done(null, false, req.flash('loginMessage', 'No user found.'));

      // if the user is found but the password is wrong
      if (!( rows[0].password == password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      // all is well, return successful user
      var newLogin = new Object();
      newLogin.user_id = rows[0].user_id;
      return done(null, newLogin);
    });
  }));
};
