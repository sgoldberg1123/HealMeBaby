//creating the database connection
var mysql = require('mysql');
var config = require('./config');
var dbConn = mysql.createConnection(config.dbConnection);
module.exports = dbConn;
