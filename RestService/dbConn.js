var mysql = require('mysql');
var config = require('./config');
//Setup dbConnection
var dbConn = mysql.createConnection(config.dbConnection);

module.exports = dbConn;
