//user data database config settings
var config = {};
config.dbConnection = {
  host: '71.95.85.102',
  user: 'test',
  password: 'health123',
  dateStrings: true
};
config.session = {
  secret: 'heal me baby',
  //store: sessionStore,
  resave: false,
  saveUninitialized: true,
  connectionLimit: 8
};
module.exports = config;
