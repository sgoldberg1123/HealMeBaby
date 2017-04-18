var dbConn = require('../config/dbConn');

//get all health snapshots for a user
module.exports.getUserHealthSnapshots = function(id) {
  return new Promise(function(resolve, reject){
    var sql = 'SELECT weight, height, blood_pressure_systolic, blood_pressure_distolic, heart_rate '+
    'FROM health.healthsnapshot ' +
    'WHERE user_id = ?';
    console.info(id);
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

//get the most recent snapshot
module.exports.getMostRecentHealthSnapshotInfo = function(id) {
  return new Promise(function(resolve, reject){
    var sql = 'SELECT weight, height, blood_pressure_systolic, blood_pressure_distolic, heart_rate '+
    'FROM health.healthsnapshot ' +
    'WHERE user_id = ? ' +
    'ORDER BY timestamp DESC ' +
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
