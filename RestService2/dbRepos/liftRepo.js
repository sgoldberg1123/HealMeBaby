var dbConn = require('../config/dbConn');

//Delete a single lift by id
module.exports.deleteLiftById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'DELETE '+
    'FROM health.gymactivity ' +
    'WHERE health.gym_activity_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      } else if(!rows.affectedRows){
        reject({status: 'FAILED', error: 'couldnt delete'});
      }
      resolve({status: 'SUCCESS'});
    });
  });
};

//Update a single lift by id
module.exports.updateLiftById = function(id, name, reps, weight, days){
  return new Promise(function(resolve, reject){
    var sql = 'UPDATE health.gymactivity '+
    'SET name = ?, ' +
    'reps = ?, ' +
    'weight = ?, ' +
    'days = ?, ' +
    'WHERE lift_id = ?';
    dbConn.query(sql, [name, reps, weight, days, id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      } else if(!rows.changedRows){
        reject({status: 'FAILED', error: 'cant find lift or no change'});
      }
      resolve({status: 'SUCCESS'});
    });
  });
};

//Get a single lift by id
module.exports.getLiftById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT * '+
    'FROM health.gymactivity' +
    'WHERE gymactivity.gym_activity_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }else if(!rows.length){
        reject({status: 'FAILED', error: 'cant find lift'});
      }
      resolve({data: rows[0], status: 'SUCCESS'});
    });
  });
};

//Get all of the lifts for a user with the given id
module.exports.getAllUserWorkouts = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT gym_activity_id, name, reps, weight, days' +
    'FROM health.gymactivity ' +
    'WHERE user_id = ?';
    dbConn.query(sql, [id], function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

//Insert a new lift given various lift parameters
module.exports.insertUserWorkout = function(user_id, name, reps, weight, days){
  return new Promise(function(resolve, reject){
    var sql = 'INSERT INTO health.gymactivity (name, reps, weight, days, User_user_id) VALUES (?,?,?,?,?,?)';
    dbConn.query(sql, [name, reps, weight, days, user_id],
      function(err){
        if(err){
          console.info(err);
          reject({status:'FAILED', error: 'UNKNOWN ERROR'});
        }
        else{
          resolve({status:'SUCCESS'});
        }
      }
    );
  });
};
