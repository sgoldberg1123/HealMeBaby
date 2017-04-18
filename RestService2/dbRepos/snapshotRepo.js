var dbConn = require('../config/dbConn');

//get all health snapshots for a user
module.exports.getUserHealthSnapshots = function(id) {
  return new Promise(function(resolve, reject){
    var sql = 'SELECT health_snapshot_id, weight, height, blood_pressure_systolic, blood_pressure_distolic, heart_rate '+
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

//Get a single snapshot by id
module.exports.getSnapshotById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'SELECT * '+
    'FROM health.healthsnapshot snap ' +
    'WHERE snap.health_snapshot_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({data: rows, status: 'SUCCESS'});
    });
  });
};

//Delete a single health snapshot by id
module.exports.deleteSnapshotById = function(id){
  return new Promise(function(resolve, reject){
    var sql = 'DELETE '+
    'FROM health.healthsnapshot ' +
    'WHERE health.healthsnapshot.health_snapshot_id = ? ';
    dbConn.query(sql, [id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({status: 'SUCCESS'});
    });
  });
};

//Update a single snapshot by id
module.exports.updateSnapshotById = function(id, weight, height, bloodPressureSys, bloodPressureDist, heartRate){
  return new Promise(function(resolve, reject){
    var sql = 'UPDATE health.healthsnapshot '+
    'SET weight = ?, ' +
    'height = ?, ' +
    'blood_pressure_systolic = ?, ' +
    'blood_pressure_distolic = ?, ' +
    'heart_rate = ? ' +
    'WHERE health_snapshot_id = ?';
    dbConn.query(sql, [weight, height, bloodPressureSys, bloodPressureDist, heartRate, id], function(err, rows){
      if(err){
        console.info(err);
        reject({status: 'FAILED', info: 'UNKNOWN ERROR'});
      }
      resolve({status: 'SUCCESS'});
    });
  });
};
