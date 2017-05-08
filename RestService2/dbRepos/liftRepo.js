var dbConn = require('../config/dbConn');


//GET ALL LIFTS QUERY
//Get all lifts by  user_id
module.exports.getAllUserLifts = function(userId){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT gym_activity_id, name, reps, weight, days ' +
    'FROM health.gymactivity ' +
    'WHERE user_id = ?';
    dbConn.query(sql, [userId], function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};


//GET LIFT QUERY
//Get a single lift by gymactivity_id
module.exports.getLiftById = function(gymactivityId){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT * '+
    'FROM health.gymactivity ' +
    'WHERE gymactivity.gym_activity_id = ? ';
    dbConn.query(sql, [gymactivityId], function(err, rows){
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


// INSERT LIFT QUERY
// Insert a new lift
module.exports.insertUserLift = function(user_id, name, reps, weight, days){
  return new Promise(function(resolve, reject){
    var sql = 'INSERT INTO health.gymactivity (name, reps, weight, days, user_id) VALUES (?,?,?,?,?)';
    dbConn.query(sql, [name, reps, weight, days, user_id],
      function(err){
        if(err){
          console.info(err);
          reject({status:'FAILED', error: err});
        }
        else{
          resolve({status:'SUCCESS'});
        }
      }
    );
  });
};



//UPDATE LIFT QUERY
//Update a single lift by gymactivity_id
module.exports.updateLiftById = function(gymactivityId, name, reps, weight, days){
  return new Promise(function(resolve, reject){
    var sql = 'UPDATE health.gymactivity '+
    'SET name = ?, ' +
    'reps = ?, ' +
    'weight = ?, ' +
    'days = ? ' +
    'WHERE gym_activity_id = ? ';
    dbConn.query(sql, [name, reps, weight, days, gymactivityId], function(err, rows){
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


// DELETE LIFT QUERY
// Delete a single lift by gymactivity_id
module.exports.deleteLiftById = function(gymactivityId){
  return new Promise(function(resolve, reject){
    var sql = 'DELETE '+
    'FROM health.gymactivity ' +
    'WHERE health.gymactivity.gym_activity_id = ? ';
    dbConn.query(sql, [gymactivityId], function(err, rows){
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