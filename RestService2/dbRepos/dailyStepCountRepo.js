var dbConn = require('../config/dbConn');

//Delete a single daily step count by id
module.exports.deleteStepCountById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'DELETE '+
    'FROM health.dailystepcount ' +
    'WHERE health.dailystepcount.daily_step_count_id = ? ';
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

//Update a single daily step count by date and user_id
module.exports.upsertStepCountByDate = function(user_id, date, step_count){
  return new Promise(function(resolve, reject){
    //Check if a step count with the given user id and date already exists
    var findQuery = 'SELECT * ' +
      'FROM health.dailystepcount ' +
      'WHERE user_id = ? AND date = ?';
    dbConn.query(findQuery, [user_id, date], function(err,stepCounts){
      if(err){ // If we error out, then send a failed response
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }
      else{
        if(stepCounts.length > 0){ //A step count with the given info was found update it
          var updateQuery = 'UPDATE health.dailystepcount '+
            'SET step_count = ? ' +
            'WHERE user_id = ? AND date = ?';
          dbConn.query(updateQuery, [step_count, user_id, date], function(err, rows){
            if(err){
              console.info(err);
              reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
            }
            resolve({status: 'SUCCESS'});
          });
        }
        else{//A step count with the given date was not found, insert a new one
          var insertQuery = 'INSERT INTO health.dailystepcount '+
            '(step_count, user_id, date) ' +
            'VALUES (?,?,?)';
          dbConn.query(insertQuery, [step_count, user_id, date], function(err, rows){
            if(err){
              console.info(err);
              reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
            }
            resolve({status: 'SUCCESS'});
          });
        }
      }
    });
  });
};

//Get all user step counts by user id
module.exports.getAllStepCounts = function(user_id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT * '+
    'FROM health.dailystepcount dsc ' +
    'WHERE dsc.user_id = ? ';
    dbConn.query(sql, [user_id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

//Get all of the step ounts for a user with the given date (should only be one)
module.exports.getStepCountByDate = function(user_id, date){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT * ' +
    'FROM health.dailystepcount ' +
    'WHERE user_id = ? AND date = ?';
    dbConn.query(sql, [user_id, date], function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};
