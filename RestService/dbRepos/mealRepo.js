var dbConn = require('../config/dbConn');

//Delete a single meal by id
module.exports.deleteMealById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'DELETE '+
    'FROM health.meal ' +
    'WHERE health.meal.meal_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({status: 'SUCCESS'});
    });
  });
};

//Update a single meal by id
module.exports.updateMealById = function(id, foodName, calories, sugar, protein, fat, mealType, carb, date){
  return new Promise(function(resolve, reject){
    var sql = 'UPDATE health.meal '+
    'SET food_name = ?, ' +
    'calories = ?, ' +
    'sugar = ?, ' +
    'protein = ?, ' +
    'fat = ?, ' +
    'meal_type = ?, ' +
    'carb = ?, ' +
    'timestamp = ? ' +
    'WHERE meal_id = ?';
    dbConn.query(sql, [foodName, calories, sugar, protein, fat, mealType, carb, date, id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({status: 'SUCCESS'});
    });
  });
};

//Get a single meal by id
module.exports.getMealById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT * '+
    'FROM health.meal meal ' +
    'WHERE meal.meal_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
}
