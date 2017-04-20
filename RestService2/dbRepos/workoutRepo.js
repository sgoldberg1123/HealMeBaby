var dbConn = require('../config/dbConn');

//Delete a single workout by id
module.exports.deleteWorkoutById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'DELETE '+
    'FROM health.workout ' +
    'WHERE health.workout.workout_id = ? ';
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

//Update a single workout by id
module.exports.updateWorkoutById = function(id, name, intensity, calorieBurn, length, date){
  return new Promise(function(resolve, reject){
    var sql = 'UPDATE health.workout '+
    'SET name = ?, ' +
    'intensity = ?, ' +
    'calorie_burn = ?, ' +
    'length = ?, ' +
    'timestamp = ? ' +
    'WHERE workout_id = ?';
    dbConn.query(sql, [name, intensity, calorieBurn, length, date, id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      } else if(!rows.changedRows){
        reject({status: 'FAILED', error: 'cant find workout or no change'});
      }
      resolve({status: 'SUCCESS'});
    });
  });
};

//Get a single workout by id
module.exports.getWorkoutById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT * '+
    'FROM health.workout workout ' +
    'WHERE workout.workout_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }else if(!rows.length){
        reject({status: 'FAILED', error: 'cant find workout'});
      }
      resolve({data: rows[0], status: 'SUCCESS'});
    });
  });
};

//Get all of the workouts for a user with the given id
module.exports.getAllUserWorkouts = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT workout_id, name, intensity, calorie_burn, timestamp, length ' +
    'FROM health.workout ' +
    'WHERE User_user_id = ?';
    dbConn.query(sql, [id], function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

//Insert a new workout given various workout parameters
module.exports.insertUserWorkout = function(user_id, name, intensity, calorieBurn, timestamp, length){
  return new Promise(function(resolve, reject){
    var sql = 'INSERT INTO health.workout (name, intensity, calorie_burn, timestamp, length, User_user_id) VALUES (?,?,?,?,?,?)';
    dbConn.query(sql, [name, intensity, calorieBurn, timestamp, length, user_id],
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
