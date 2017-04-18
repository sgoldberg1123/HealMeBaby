var express = require('express');
var passport = require('passport');
require('../../config/passport')(passport);
var config = require('../../config/config');
var mealRepo = require('../../dbRepos/mealRepo');

const meal = express.Router();

meal.post('/all', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var id = user.user_id;
      mealRepo.getAllUserMeals(id).then((data)=>res.json(data))
      .catch((data) => {res.json(data);});
    }
  })(req, res, next);
});

meal.post('/insert', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var id = user.user_id;
      var calories = req.body.calories;
      var foodName = req.body.foodName;
      var sugar = req.body.sugar;
      var date = req.body.date;
      var protein = req.body.protein;
      var fat = req.body.fat;
      var mealType = req.body.mealType;
      var carb = req.body.carb

      mealRepo.insertUserMeal(id, foodName, sugar, calories, protein, fat, mealType,carb, date)
        .then((data)=>{res.redirect('/meals');})
        .catch((data) => {res.json(data);});
    }
  })(req, res, next);
});

meal.post('/delete', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var meal_id = req.body.meal_id;
      mealRepo.deleteMealById(meal_id)
        .then((data) => res.redirect('/meals'))
        .catch((data) => res.redirect('/meals'));
    }
  })(req, res, next);
});

//Get a single meal by id
meal.post('/', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
      var meal_id = req.body.meal_id;
      mealRepo.getMealById(meal_id)
        .then((data) => res.json(data))
        .catch((data) => res.json(data));
    }
  })(req, res, next);
});

meal.post('/update', function(req, res, next){
  passport.authenticate('jwt', config.jwtConfig.jwtSession, function(err, user, info){
    if(err){ return next(err); }
    else if(!user){ return res.json({error: 'Please login'}); }
    else{
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
  })(req, res, next);
});

module.exports = meal;
