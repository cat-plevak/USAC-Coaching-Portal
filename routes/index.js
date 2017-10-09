var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('body/home', {title: 'USAC Coaching - Home', _layoutFile: 'layout.ejs'});
});

module.exports = router;
