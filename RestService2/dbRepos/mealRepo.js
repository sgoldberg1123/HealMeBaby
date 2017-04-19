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
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      } else if(!rows.affectedRows){
        reject({status: 'FAILED', error: 'couldnt delete'});
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
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      } else if(!rows.changedRows){
        reject({status: 'FAILED', error: 'cant find meal or no change'});
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
        reject({status: 'FAILED', error: 'UNKNOWN ERROR'});
      }else if(!rows.length){
        reject({status: 'FAILED', error: 'cant find meal'});
      }
      resolve({data: rows[0], status: 'SUCCESS'});
    });
  });
};

//Get all of the meals for a user with the given id
module.exports.getAllUserMeals = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT meal_id, calories, food_name, protein, carb, fat, sugar, timestamp, meal_type ' +
    'FROM health.meal ' +
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

//Insert a new meal given various meal parameters
module.exports.insertUserMeal = function(user_id, foodName, sugar, calories, protein, fat, mealType, carb, date){
  return new Promise(function(resolve, reject){
    var sql = 'INSERT INTO health.meal (food_name, calories, sugar, protein, fat, meal_type, carb, User_user_id, timestamp) VALUES (?,?,?,?,?,?,?,?,?)';
    dbConn.query(sql, [foodName, calories, sugar, protein, fat, mealType, carb, user_id, date],
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
