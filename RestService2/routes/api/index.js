//links all data tables together under the /api directive
var express = require('express');
var user = require('./user');
var meal = require('./meal');
var snapshot = require('./snapshot');

const api = express.Router();

//imports data routers to use another directive
// ex: /api/user
api.use('/user', user);
api.use('/meal', meal);
api.use('/snapshot', snapshot);

module.exports = api;
