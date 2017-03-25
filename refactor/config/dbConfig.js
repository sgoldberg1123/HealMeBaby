//user data database config settings
var ip = '192.168.1.100';
var dbConfig = {};
dbConfig.dbConnection = {
  host: ip,
  user: 'test',
  password: 'health123',
  database: 'health'
};
//session data store options
dbConfig.sess = {
  host: ip,
  port: 3306,
  user: 'sess',
  password: 'sess123',
  database: 'session_info'
};
module.exports = dbConfig;
