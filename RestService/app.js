var express = require('express');
var userRepo = require('./Repositories/userRepo');
var bodyParser = require('body-parser');
var app = new express();

//   _____      _
// / ____|    | |
//| (___   ___| |_ _   _ _ __
//\____ \ / _ \ __| | | | '_ \
//____) |  __/ |_| |_| | |_) |
//|____/ \___|\__|\__,_| .__/
//                    | |
//                    |_|

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

//TODO this is most definitely insecure will need to change it
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

//______           _             _       _
//|  ____|         | |           (_)     | |
//| |__   _ __   __| |_ __   ___  _ _ __ | |_ ___
//|  __| | '_ \ / _` | '_ \ / _ \| | '_ \| __/ __|
//| |____| | | | (_| | |_) | (_) | | | | | |_\__ \
//|______|_| |_|\__,_| .__/ \___/|_|_| |_|\__|___/
//                  | |
//                  |_|

//Get user by id
//Arg id specifies id to
app.get('/api/user/id', function(req, res){
  var id = req.query.id;
  userRepo.getById(id).then((data) => {
    res.json(data);
  });
});

//Get all users
app.get('/api/user/all', function(req, res){
  userRepo.getAll().then((data) => {
    res.json(data);
  });
});

//Insert user into database
app.post('/api/user/insert', function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  userRepo.insertUser(firstName, lastName, email, password).then((data) => {
    res.json(data);
  });
});

// Start the server
app.listen(8000);
console.info('Server listening on port 8000');
