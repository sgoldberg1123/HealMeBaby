var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var workoutRepo = require('../../dbRepos/workoutRepo');

const workout = express.Router();

workout.post('/all', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
    else{
      var id = user.user_id;
      workoutRepo.getAllUserWorkouts(id).then((data)=> res.json(data))
      .catch((data) => res.json(data));
    }
  })(req, res, next);
});

workout.post('/insert', function(req, res, next){
  if(req.body.name && req.body.intensity && req.body.calorieBurn && req.body.timestamp && req.body.length){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var user_id = user.user_id;
        var name = req.body.name;
        var intensity = req.body.intensity;
        var calorieBurn = req.body.calorieBurn;
        var timestamp = req.body.timestamp;
        var length = req.body.length;

        workoutRepo.insertUserWorkout(user_id, name, intensity, calorieBurn, timestamp, length)
          .then((data)=> res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

workout.post('/delete', function(req, res, next){
  if(req.body.workout_id){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var workout_id = req.body.workout_id;
        workoutRepo.deleteWorkoutById(workout_id)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

//Get a single workout by id
workout.post('/', function(req, res, next){
  if(req.body.workout_id){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var workout_id = req.body.workout_id;
        workoutRepo.getWorkoutById(workout_id)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

//Update a single workout by id
workout.post('/update', function(req, res, next){
  if(req.body.workout_id && req.body.name && req.body.intensity && req.body.calorieBurn && req.body.timestamp && req.body.length){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var workout_id = req.body.workout_id;
        var name = req.body.name;
        var intensity = req.body.intensity;
        var calorieBurn = req.body.calorieBurn;
        var timestamp = req.body.timestamp;
        var length = req.body.length;

        workoutRepo.updateWorkoutById(workout_id, name, intensity, calorieBurn, length, timestamp)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});

module.exports = workout;
