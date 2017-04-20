var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var sportRepo = require('../../dbRepos/sportRepo');

const sport = express.Router();

//Get all sports
sport.post('/all', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
    else{
      sportRepo.getAllSports().then((data)=> res.json(data))
      .catch((data) => res.json(data));
    }
  })(req, res, next);
});
module.exports = sport;
