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

//Insert a new meal given various meal parameters
module.exports.insertUserMeal = function(user_id, foodName, sugar, calories, protein, fat, mealType, carb, date){
  return new Promise(function(resolve, reject){
    var sql = 'INSERT INTO health.meal (food_name, calories, sugar, protein, fat, meal_type, carb, User_user_id) VALUES (?,?,?,?,?,?,?,?)';
    dbConn.query(sql, [foodName, calories, sugar, protein, fat, mealType, carb, user_id],
      function(err){
        if(err){
          console.info(err);
          reject({status:'FAILED',info: 'UNKNOWN ERROR'});
        }
        else
          resolve({status:'SUCCESS'});
      }
    );
  });
};
