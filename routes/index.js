var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tapas proto' });
});

router.get('/cropping', function(req, res, next) {
  res.render('cropping');
});

module.exports = router;
