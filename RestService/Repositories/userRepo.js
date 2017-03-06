var dbConn = require('../dbConn');

module.exports = {
  //Get all users
  getAll: function() {
    return new Promise(function(resolve, reject){
      dbConn.query('SELECT * FROM health.user',function(err,rows){
        if(err){
          console.info(err);
          reject({
            status: 'FAILED',
            info: 'UNKNOWN ERROR'
          });
        }
        resolve({
          data: rows,
          status: 'SUCCESS'
        });
      });
    });
  },

  //Get a single user by their id
  getById: function(id){
    return new Promise(function(resolve, reject){
      dbConn.query('SELECT * FROM health.user WHERE user_id=?', [id], function(err, rows){
        if(err){
          console.info(err);
          reject({
            status:'FAILED',
            info: 'UNKNOWN ERROR'
          });
        }
        resolve({
          data: rows,
          status:'SUCCESS'
        });
      });
    });
  },

  //Insert a user into the database with the given values
  insertUser: function(firstName, lastName, email, password){
    return new Promise(function(resolve, reject){
      dbConn.query('INSERT INTO health.user (first_name, email, last_name, password) VALUES(?,?,?,?)',
        [firstName, email, lastName, password],
        function(err){
          if(err)
            if(err.code === 'ER_DUP_ENTRY')
            {
              reject({
                status:'FAILED',
                info: 'USER EXISTS'
              });
            }
            else{
              console.info(err);
              reject({
                status:'FAILED',
                info: 'UNKNOWN ERROR'
              });
            }
          else
            resolve({
              status:'SUCCESS',
            });
        }
      );
    });
  }
};
