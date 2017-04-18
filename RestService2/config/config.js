//user data database config settings for remote development
//change to localhost and make passwords more secure for final product
var config = {};
config.dbConnection = {
  host: '71.95.85.102',
  user: 'test',
  password: 'health123',
  dateStrings: true
};

//JWT secret and session config
config.jwtConfig = {
    jwtSecret: "heal me baby",
    jwtSession: {
        session: false
    }
}
module.exports = config;
