//import our repo functions and authentication
var userRepo = require('../../dbRepos/userRepo');
var config = require('../../config/config');
var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var jwt = require("jwt-simple");

const user = express.Router();

user.post('/signup', function(req, res){
  if(req.body.firstName && req.body.lastName && req.body.email && req.body.password){
    userRepo.createUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName).then((data) => {
      var payload = {
        id: data.returnData.id
      };
      var token = jwt.encode(payload, config.jwtConfig.jwtSecret);
      res.json({
        token: token,
        firstName: data.returnData.name,
        status: 'SUCCESS'
      });
    }).catch((data) => {
      res.json({
        error: 'Email already in use',
        status: 'FAILED'
      });
    });
  } else{
    res.json({
      status: 'FAILED',
      error: 'Fill out all fields'
    });
  }
});

user.post('/login', function(req, res){
  if(req.body.email && req.body.password){
    userRepo.userVerify(req.body.email, req.body.password).then((data) => {
      var payload = {
        id: data.returnData.id
      };
      var token = jwt.encode(payload, config.jwtConfig.jwtSecret);
      res.json({
        token: token,
        firstName: data.returnData.name,
        status: 'SUCCESS'
      });
    })
    .catch((data) => {
      res.json({
        status: 'FAILED',
        error: 'Invalid Email or Password'
      });
    });
  } else {
    res.json({
      status: 'FAILED',
      error: 'Fill out all fields'
    });
  }
});

//get user info
user.post('/', function(req, res, next) {
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if (err) { return next(err); }
    if (!user) { return res.json({status: 'FAILED', error: 'Please login'}); }
    userRepo.getUserById(user.user_id)
      .then((data) => res.json(data))
      .catch((data) => res.json(data));
  })(req, res, next);
});

user.post('/update', function(req, res, next) {
  if(req.body.email && req.body.firstName && req.body.lastName){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if (err) { return next(err); }
      if (!user) { return res.json({status: 'FAILED', error: 'Please login'}); }
      userRepo.updateUserInfo(user.user_id, req.body.email, req.body.firstName, req.body.lastName)
        .then((data) => res.json(data))
        .catch((data) => res.json(data));
    })(req, res, next);
  }else{
      res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

module.exports = user;
