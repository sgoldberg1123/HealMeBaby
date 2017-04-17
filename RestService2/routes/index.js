//the root router
var express = require('express');
var web = require('./web');
var api = require('./api');

const router = express.Router();

router.use(web);
router.use('/api', api);

module.exports = router;
