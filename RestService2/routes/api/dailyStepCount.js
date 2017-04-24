var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var dailyStepCountRepo = require('../../dbRepos/dailyStepCountRepo');

const dailyStepCount = express.Router();

//Delete a daily step count by id
dailyStepCount.post('/delete', function(req, res, next){
  if(req.body.step_count_id){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err) { return next(err); }
      else if(!user){return res.json({status: 'FAILED', error: 'Please login'});}
      else{
        var id = req.body.step_count_id;
        dailyStepCountRepo.deleteStepCountById(id)
          .then((data) => {res.json(data)})
          .catch((data) => {res.json(data)});
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

//Insert or update a daily step count based on if the user already has a step count for the given date
dailyStepCount.post('/upsert', function(req, res, next){
  if(req.body.step_count && req.body.date){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var user_id = user.user_id;
        var step_count = req.body.step_count;
        var date = req.body.date;
        dailyStepCountRepo.upsertStepCountByDate(user_id, date, step_count)
          .then((data) => {res.json(data)})
          .catch((data) => {res.json(data)});
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }

});

//Get a daily step count by date
dailyStepCount.post('/date', function(req, res, next){
  if(req.body.date){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var id = user.user_id;
        var date = req.body.date;
        dailyStepCountRepo.getStepCountByDate(id, date)
          .then((data) => {res.json(data)})
          .catch((data) => {res.json(data)});
      }
    })(req, res, next);
  }
  else{
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

//Get a all daily step counts for user
dailyStepCount.post('/all', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
    else{
      var id = user.user_id
      dailyStepCountRepo.getAllStepCounts(id)
        .then((data) => res.json(data))
        .catch((data) => res.json(data));
    }
  })(req, res, next);
});

module.exports = dailyStepCount;
