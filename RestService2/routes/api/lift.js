var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var liftRepo = require('../../dbRepos/liftRepo');
const lift = express.Router();

lift.post('/all', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
    else{
      var id = user.user_id;
      liftRepo.getAllUserLifts(id).then((data) => res.json(data))
      .catch((data) => res.json(data));
    }
  })(req, res, next);
});

lift.post('/insert', function(req, res, next){
  if(req.body.name && req.body.intensity && req.body.calorieBurn && req.body.timestamp && req.body.length){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var user_id = user.user_id;
        var gym_workout_id = req.body.gym_workout_id;
        var name = req.body.name;
        var reps = req.body.reps;
        var weight = req.body.weight;
        var days = req.body.days;
        

        liftRepo.insertUserWorkout(user_id, name, intensity, calorieBurn, timestamp, length)
          .then((data)=> res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

lift.post('/delete', function(req, res, next){
  if(req.body.lift_id){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var lift_id = req.body.lift_id;
        liftRepo.deleteWorkoutById(lift_id)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

//Get a single lift by id
lift.post('/', function(req, res, next){
  if(req.body.lift_id){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var lift_id = req.body.lift_id;
        liftRepo.getWorkoutById(lift_id)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

//Update a single lift by id
lift.post('/update', function(req, res, next){
  if(req.body.lift_id && req.body.name && req.body.intensity && req.body.calorieBurn && req.body.timestamp && req.body.length){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var lift_id = req.body.lift_id;
        var name = req.body.name;
        var intensity = req.body.intensity;
        var calorieBurn = req.body.calorieBurn;
        var timestamp = req.body.timestamp;
        var length = req.body.length;

        liftRepo.updateWorkoutById(lift_id, name, intensity, calorieBurn, length, timestamp)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

module.exports = lift;
