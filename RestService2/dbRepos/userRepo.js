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

//Get user info
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

//create a user
module.exports.createUser = function(email, password, first_name, last_name){
  return new Promise(function(resolve,reject){
    dbConn.query('SELECT * from health.user where email = ?',[email],function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      } else if(rows.length){
        reject({status: 'FAILED', info: 'Email taken'});
      } else{
        // if there is no user with that email create one
        var returnData = new Object();
        var insertQuery = 'INSERT INTO health.user ( email, password, first_name, last_name ) values (?,?,?,?)';
        dbConn.query(insertQuery,[email, password, first_name, last_name],function(err,rows){
          if(err){
            console.info(err);
            reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
          } else if(!rows.insertId){
            reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
          } else{
            returnData.id = rows.insertId;
            returnData.name = first_name;
            resolve({returnData,status: 'SUCCESS'});
          }
        });
      }
    });
  });
};

//check user login
module.exports.userVerify = function(email, password){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT user.user_id, user.first_name, user.last_name, user.password ' +
    'FROM health.user AS user ' +
    'WHERE user.email = ?';
    dbConn.query(sql, [email], function(err,rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED',info: 'UNKNOWN ERROR'});
      }else if(!rows.length){
        reject({status: 'FAILED',info: 'UNKNOWN ERROR'});
      }else if(rows[0].password != password ){
        reject({status: 'FAILED',info: 'UNKNOWN ERROR'});
      }else {
        var returnData = {
          id: rows[0].user_id,
          name: rows[0].first_name
        }

        resolve({returnData, status: 'SUCCESS'});
      }
    });
  });
};

//update a user's info
module.exports.updateUserInfo = function(id, email, firstName, lastName){
  return new Promise(function(resolve, reject){
    var sql = 'UPDATE health.user ' +
    'SET email = ?, first_name = ?, last_name = ? ' +
    'where user_id = ?';
    dbConn.query(sql, [email, firstName, lastName, id], function(err, rows, fields){
      if(err){
        console.info(err);
        reject({status: 'FAILED',info: 'err'});
      }else if(!rows.changedRows){
        reject({status: 'FAILED',info: 'UNKNOWN ERROR'});
      }else {

        resolve({status: 'SUCCESS'});
      }
    });
  });
};
