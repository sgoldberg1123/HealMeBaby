//links all data tables together under the /api directive
var express = require('express');
var user = require('./user');
var meal = require('./meal');
var snapshot = require('./snapshot');
var sport = require('./sport');
var workout = require('./workout');
var lift = require('./lift');
var dailyStepCount = require('./dailyStepCount');


const api = express.Router();

//imports data routers to use another directive
// ex: /api/user
api.use('/user', user);
api.use('/meal', meal);
api.use('/snapshot', snapshot);
api.use('/sport', sport);
api.use('/workout', workout);
api.use('/lift', lift);
api.use('/dailyStepCount', dailyStepCount);


module.exports = api;
