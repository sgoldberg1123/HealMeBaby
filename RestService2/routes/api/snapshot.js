var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var snapshotRepo = require('../../dbRepos/snapshotRepo');

const snapshot = express.Router();

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
        .then((data) => {res.redirect('/profile');})
        .catch((data) => {res.redirect('/profile');});
    }
  })(req, res, next);
});

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

module.exports = snapshot;
