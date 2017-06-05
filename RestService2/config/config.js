//user data database config settings for remote development
//change to localhost and make passwords more secure for final product
var config = {};
config.dbConnection = {
  host: '129.144.188.18',
  user: 'root',
  password: 'Fest@100',
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
