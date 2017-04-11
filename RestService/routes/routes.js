var userRepo = require('../dbRepos/userRepo');
var mealRepo = require('../dbRepos/mealRepo');
var request = require('request');
//expose routes to the app
module.exports = function(app, passport) {
  //Check wether or not request is authenticated and store into variable
  app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
  });

  //Load the default landing page
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

  //Load the login page (or home page if already authenticated)
  app.get('/login', function(req, res) {
      if(req.isAuthenticated()){
        res.redirect('/');
      } else{
        //login with error message
        res.render('login.ejs', { message: req.flash('loginMessage') });
      }
  });

  //Login with a given username and password (passed in post body)
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
  }));

  //Load the signup page (or home page if already authenticated)
  app.get('/signup', function(req, res) {
    if(req.isAuthenticated()){
      res.redirect('/');
    } else{
      //sign up with error message
      res.render('signup.ejs', { message: req.flash('loginMessage') });
    }
  });

  //Signup for a new account
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
  }));

  //Logout and end the current session
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  //Get the data on the current user
  app.get('/user', function(req, res) {
    userRepo.getUserById(req.user.user_id)
      .then((data) => res.json(data))
      .catch((data) => res.json(data));
  });

  //Load the nutrition page
  app.get('/nutrition', function(req, res) {
      res.render('nutritionSearch.ejs');
  });

  //Load the profile page (or login page if not authenticated)
  app.get('/profile', function(req, res) {
    if(req.isAuthenticated()){
      res.render('profile.ejs');
    } else{
      res.redirect('/login');
    }
  });
  //Load the health history page (or login page if not authenticated)
  app.get('/healthHistory', function(req, res) {
    if(req.isAuthenticated()){
      res.render('healthHistory.ejs');
    } else{
      res.redirect('/login');
    }
  });

  //Load the meals page (or login page if not authenticated)
  app.get('/meals', function(req, res){
    if(req.isAuthenticated()){
      res.render('meals.ejs');
    } else{
      res.redirect('/login');
    }
  });

  app.get('/chart', function(req, res){
    if(req.isAuthenticated()){
      res.render('chart.ejs');
    } else{
      res.redirect('/login');
    }
  });


  //Get all meals for a user
  app.get('/user/meal/all', function(req, res){
      var id = req.user.user_id;
      userRepo.getAllUserMeals(id).then((data)=>res.json(data))
      .catch((data) => {res.json(data);});
  });

  //Insert a new meals
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

  //Insert a new health snapshot
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

  //Get the most recent health snapshot for a user
  app.get('/user/healthsnapshot/recent', function(req, res){
    var id = req.user.user_id;
    userRepo.getMostRecentHealthSnapshotInfo(id)
      .then((data) => {res.json(data)})
      .catch((data) => {res.json(data)});
  });

  //Get all health snapshots for a user
  app.get('/user/healthsnapshot/all', function(req, res){
    var id = req.user.user_id;
    userRepo.getUserHealthSnapshots(id)
      .then((data) => {res.json(data)})
      .catch((data) => {res.json(data)});
  });

  //Delete a meal by id
  app.post('/meal/delete', function(req, res){
    if(req.isAuthenticated()){
      var meal_id = req.body.meal_id;
      mealRepo.deleteMealById(meal_id)
        .then((data) => res.redirect('/meals'))
        .catch((data) => res.redirect('/meals'));
    }
  });

  //Get a single meal by id
  app.get('/meal', function(req, res){
    if(req.isAuthenticated()){
      var meal_id = req.query.meal_id;
      mealRepo.getMealById(meal_id)
        .then((data) => res.json(data))
        .catch((data) => res.json(data));
    }
  });

  //Update a single meal by id
  app.post('/meal/update', function(req, res){
    if(req.isAuthenticated()){
      var meal_id = req.body.meal_id;
      var calories = req.body.calories;
      var foodName = req.body.foodName;
      var sugar = req.body.sugar;
      var date = req.body.date;
      var protein = req.body.protein;
      var fat = req.body.fat;
      var mealType = req.body.mealType;
      var carb = req.body.carb;
      mealRepo.updateMealById(meal_id, foodName, calories, sugar, protein, fat, mealType, carb, date)
        .then((data) => res.redirect('/meals'))
        .catch((data) => res.redirect('/meals'));
    }
  });


  //Get all users (Testing only)
  /*app.get('/user/all', function(req,res){
    userRepo.getAllUsers().then((data)=>{
      res.json(data);
    });
  });*/
};
