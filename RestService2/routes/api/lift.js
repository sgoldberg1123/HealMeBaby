var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var liftRepo = require('../../dbRepos/liftRepo');
const lift = express.Router();


// GET ALL LIFTS
// Get all lifts using user_id
lift.post('/all', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
    else{
      var userId = user.user_id;
      liftRepo.getAllUserLifts(userId).then((data) => res.json(data))
      .catch((data) => res.json(data));
    }
  })(req, res, next);
});


// GET LIFT 
// get a single lift with a activity_id
lift.post('/', function(req, res, next){
  if(req.body.gymactivity_id){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var gymactivity_id = req.body.gymactivity_id;
        
        liftRepo.getLiftById(gymactivity_id)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});


// INSERT LIFT BY ID
// Insert a new lift using user_id
lift.post('/insert', function(req, res, next){
  if(req.body.name && req.body.weight && req.body.reps && req.body.days){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var user_id = user.user_id;
        var name = req.body.name;
        var reps = req.body.reps;
        var weight = req.body.weight;
        var days = req.body.days;
        

        liftRepo.insertUserLift(user_id, name, reps, weight, days)
          .then((data)=> res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});


// UPDATE LIFT BY ID
// Update a single lift with a gymactivity_id
lift.post('/update', function(req, res, next){
  if(req.body.gymactivity_id && req.body.name && req.body.reps && req.body.weight && req.body.days){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var gymactivity_id = req.body.gymactivity_id;
        var name = req.body.name;
        var reps = req.body.reps;
        var weight = req.body.weight;
        var days = req.body.days;

        liftRepo.updateLiftById(gymactivity_id, name, reps, weight, days)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});


// DELETE LIFT
// Delete a single lift using user_id and gym_workout_id
lift.post('/delete', function(req, res, next){
  if(req.body.gymactivity_id){
    passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
      if(err){ return next(err); }
      else if(!user){ return res.json({status: 'FAILED', error: 'Please login'}); }
      else{
        var gymactivity_id = req.body.gymactivity_id;
        liftRepo.deleteLiftById(gymactivity_id)
          .then((data) => res.json(data))
          .catch((data) => res.json(data));
      }
    })(req, res, next);
  } else {
    res.json({status: 'FAILED', error: 'Please fill out all fields'});
  }
});


module.exports = lift;
