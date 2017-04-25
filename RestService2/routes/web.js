//web pages
var express = require('express');

const web = express.Router();

web.get('/', function(req, res) {
  res.render('index.ejs');
});

web.get('/signup', function(req, res){
  res.render('signup.ejs');
});

web.get('/login', function(req, res) {
  res.render('login.ejs');
});

web.get('/nutrition', function(req, res) {
  res.render('nutritionSearch.ejs');
});

web.get('/pedometer', function(req, res) {
  res.render('pedometer.ejs');
});

web.get('/profile', function(req, res) {
  res.render('profile.ejs');
});

//Load the health history page (or login page if not authenticated)
web.get('/health', function(req, res) {
  res.render('healthHistory.ejs');
});

web.get('/activities', function(req, res){
  res.render('activity.ejs');
});

web.get('/meals', function(req, res){
  res.render('meals.ejs');
});

web.get('/chart', function(req, res){
  res.render('chart.ejs');
});

web.get('/lift', function(req,res){
  res.render('lift.ejs');
});

module.exports = web;
