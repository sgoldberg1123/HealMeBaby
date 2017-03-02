var express = require('express');
var mysql = require('mysql');
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

//Connect to database
var con = mysql.createConnection({
  host: '71.95.85.102',
  user: 'test',
  password: 'health123'
});

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
  con.query('SELECT * FROM health.user WHERE user_id=?', [id], function(err, rows){
    if(err) throw err;
    res.json(rows);
  });
});

//Get all users
app.get('/api/user/all', function(req, res){
  con.query('SELECT * FROM health.user',function(err,rows){
    if(err){
      console.log(err);
    }
    res.json(rows);
  });
});

app.post('/api/user/insert', function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  con.query('INSERT INTO health.user (first_name, email, last_name, password) VALUES(?,?,?,?)',
    [firstName, email, lastName, password],
    function(err){
      if(err)
        if(err.code === 'ER_DUP_ENTRY')
          res.json('User with this email already exists');
        else
          console.log(err);
      else
        res.json('SUCCESS');
    }
  );
});

app.post('/api/user/login', function(req, res){
  console.log('Why no work?');
  var email = req.body.email;
  var password = req.body.password;
  con.query('SELECT * FROM health.user WHERE email = ? AND password = ?',
    [email, password],
    function(err, rows){
      if(err){
        console.log(err);
      }
      res.json(rows);
    }
  );
});

// Start the server
app.listen(8000);
console.info('Server listening on port 8000');
