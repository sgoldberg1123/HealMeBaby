var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var snapshotRepo = require('../../dbRepos/snapshotRepo');

const snapshot = express.Router();

//Insert a new health snapshot
snapshot.post('/insert', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if (!user) { return res.json({error: 'Please login'}); }
    else {
      var id = user.user_id;
      var weight = req.body.weight;
      var height = req.body.height;
      var bloodPressureSys = req.body.bloodPressureSys;
      var bloodPressureDist = req.body.bloodPressureDist;
      var heartRate = req.body.heartRate;
      snapshotRepo.insertUserHealthSnapshot(id, weight, height, bloodPressureSys, bloodPressureDist, heartRate)
        .then((data) => {res.json(data);})
        .catch((data) => {res.json(data);});
    }
  })(req, res, next);
});

//Delete a snapshot by id
snapshot.post('/delete', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err) { return next(err); }
    else if(!user){return res.json({error: 'Please login'});}
    else{
      var id = req.body.snapshot_id;
      snapshotRepo.deleteSnapshotById(id)
        .then((data) => {res.json(data)})
        .catch((data) => {res.json(data)});
    }
  })(req, res, next);
});

//Get the most recent health snapshot
snapshot.post('/recent', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var id = user.user_id;
      snapshotRepo.getMostRecentHealthSnapshotInfo(id)
        .then((data) => {res.json(data)})
        .catch((data) => {res.json(data)});
    }
  })(req, res, next);
});

//Get all health snapshots
snapshot.post('/all', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var id = user.user_id;
      snapshotRepo.getUserHealthSnapshots(id)
        .then((data) => {res.json(data)})
        .catch((data) => {res.json(data)});
    }
  })(req, res, next);
});

//Get a single snapshot by id
snapshot.post('/', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var snapshot_id = req.body.snapshot_id;
      snapshotRepo.getSnapshotById(snapshot_id)
        .then((data) => res.json(data))
        .catch((data) => res.json(data));
    }
  })(req, res, next);
});

//Update a single snapshot by id
snapshot.post('/update', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var id = req.body.snapshot_id;
      var weight = req.body.weight;
      var height = req.body.height;
      var bloodPressureSys = req.body.blood_pressure_systolic;
      var bloodPressureDist = req.body.blood_pressure_distolic;
      var heartRate = req.body.heart_rate;

      snapshotRepo.updateSnapshotById(id, weight, height, bloodPressureSys, bloodPressureDist, heartRate)
        .then((data) => res.json(data))
        .catch((data) => res.json(data));
    }
  })(req, res, next);
});

module.exports = snapshot;
