var dbConn = require('../config/dbConn');

//Get all users (this should be used for testing only)
module.exports.getAllUsers = function() {
  return new Promise(function(resolve, reject){
      dbConn.query('SELECT * FROM health.user',function(err,rows){
        if(err){
          console.info(err);
          reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
        }
        resolve({data: rows,status: 'SUCCESS'});
      });
    });
};

module.exports.getUserHealthSnapshots = function(id) {
  return new Promise(function(resolve, reject){
    var sql = 'SELECT hs.weight, hs.height, hs.blood_pressure_systolic, hs.blood_pressure_distolic, hs.heart_rate '+
    'FROM health.user ' +
    'INNER JOIN health.healthsnapshot hs ' +
    'ON user.user_id = hs.user_id ' +
    'WHERE user.user_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

module.exports.getMostRecentHealthSnapshotInfo = function(id) {
  return new Promise(function(resolve, reject){
    var sql = 'SELECT hs.weight, hs.height, hs.blood_pressure_systolic, hs.blood_pressure_distolic, hs.heart_rate '+
    'FROM health.user ' +
    'INNER JOIN health.healthsnapshot hs ' +
    'ON user.user_id = hs.user_id ' +
    'WHERE user.user_id = ? ' +
    'ORDER BY hs.timestamp DESC ' +
    'LIMIT 1';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

//Get all of the meals for a user with the given id
module.exports.getAllUserMeals = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT meal.meal_id, meal.calories, meal.food_name, meal.protein, meal.carb, meal.fat, meal.sugar, meal.timestamp, meal.meal_type ' +
    'FROM health.meal AS meal ' +
    'INNER JOIN health.user AS user ' +
    'ON meal.User_user_id = user.user_id ' +
    'WHERE user.user_id = ?';
    dbConn.query(sql, [id], function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED',info: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

//Get all of the meals for a user with the given id
module.exports.getUserById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT user.email, user.first_name, user.last_name ' +
    'FROM health.user AS user ' +
    'WHERE user.user_id = ?';
    dbConn.query(sql, [id], function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED',info: 'UNKNOWN ERROR'});
      }
      resolve({data: rows[0], status: 'SUCCESS'});
    });
  });
};

//Insert a new health snapshot into the database with the given values
module.exports.insertUserHealthSnapshot = function(user_id, weight, height, bloodPressureSys, bloodPressureDist, heartRate ){
  return new Promise(function(resolve, reject){
    var sql = 'INSERT INTO health.healthsnapshot (user_id, weight, height, blood_pressure_systolic, blood_pressure_distolic, heart_rate) VALUES (?,?,?,?,?,?)';
    dbConn.query(sql, [user_id, weight, height, bloodPressureSys, bloodPressureDist, heartRate],
      function(err){
        if(err){
          console.info(err);
          reject({status:'FAILED', info: 'UNKNOWN ERROR'})
        }
        else{
          resolve({status:'SUCCESS'});
        }
      }
    );
  });
};

//Insert a new meal given various meal parameters
module.exports.insertUserMeal = function(user_id, foodName, sugar, calories, protein, fat, mealType, carb, date){
  return new Promise(function(resolve, reject){
    var sql = 'INSERT INTO health.meal (food_name, calories, sugar, protein, fat, meal_type, carb, User_user_id, timestamp) VALUES (?,?,?,?,?,?,?,?,?)';
    dbConn.query(sql, [foodName, calories, sugar, protein, fat, mealType, carb, user_id, date],
      function(err){
        if(err){
          console.info(err);
          reject({status:'FAILED',info: 'UNKNOWN ERROR'});
        }
        else{
          resolve({status:'SUCCESS'});
        }
      }
    );
  });
};
