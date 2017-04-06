var userRepo = require('../dbRepos/userRepo');
var request = require('request');
//expose routes to the app
module.exports = function(app, passport) {
  //Check wether or not request is authenticated and store into variable
  app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
  });

  app.get('/', function(req, res) {
      //change welcome message
      if(!req.isAuthenticated()){
        res.render('index.ejs', { welcomeMessage: -1 });
      }else {
        res.render('index.ejs', {
            welcomeMessage: req.user.first_name
        });
      }
  });

  app.get('/login', function(req, res) {
      if(req.isAuthenticated()){
        res.redirect('/');
      } else{
        //login with error message
        res.render('login.ejs', { message: req.flash('loginMessage') });
      }
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
  }));

  app.get('/signup', function(req, res) {
    if(req.isAuthenticated()){
      res.redirect('/');
    } else{
      //sign up with error message
      res.render('signup.ejs', { message: req.flash('loginMessage') });
    }
  });

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
  }));

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/user', function(req, res) {
    userRepo.getUserById(req.user.user_id)
      .then((data) => res.json(data))
      .catch((data) => res.json(data));
  });

  app.get('/nutrition', function(req, res) {
      res.render('nutritionSearch.ejs');
  });

  app.get('/profile', function(req, res) {
    if(req.isAuthenticated()){
      res.render('profile.ejs');
    } else{
      res.redirect('/login');
    }
  });

  app.get('/meals', function(req, res){
    if(req.isAuthenticated()){
      res.render('meals.ejs');
    } else{
      res.redirect('/login');
    }
  });

  app.get('/user/meals/', function(req, res){
      var id = req.user.user_id;
      userRepo.getAllUserMeals(id).then((data)=>res.json(data))
      .catch((data) => {res.json(data);});
  });

  app.post('/user/meals/insert', function(req, res){
      var id = req.user.user_id;
      var calories = req.body.calories;
      var foodName = req.body.foodName;
      var sugar = req.body.sugar;
      var date = req.body.date;
      var protein = req.body.protein;
      var fat = req.body.fat;
      var mealType = req.body.mealType;
      var carb = req.body.carb

      userRepo.insertUserMeal(id, foodName, sugar, calories, protein, fat, mealType,carb, date)
        .then((data)=>{res.redirect('/meals');})
        .catch((data) => {res.json(data);});
  });

  app.post('/user/healthsnapshot/insert', function(req, res){
    var id = req.user.user_id;
    var weight = req.body.weight;
    var height = req.body.height;
    var bloodPressureSys = req.body.bloodPressureSys;
    var bloodPressureDist = req.body.bloodPressureDist;
    var heartRate = req.body.heartRate;
    userRepo.insertUserHealthSnapshot(id, weight, height, bloodPressureSys, bloodPressureDist, heartRate)
      .then((data) => {res.redirect('/profile');})
      .catch((data) => {res.redirect('/profile');});
  });

  app.get('/user/healthsnapshot/recent', function(req, res){
    var id = req.user.user_id;
    userRepo.getMostRecentHealthSnapshotInfo(id)
      .then((data) => {res.json(data)})
      .catch((data) => {res.json('/profile');});
  });

  //Get all users (Testing only)
  /*app.get('/user/all', function(req,res){
    userRepo.getAllUsers().then((data)=>{
      res.json(data);
    });
  });*/
};
