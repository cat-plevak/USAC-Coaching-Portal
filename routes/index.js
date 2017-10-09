var express = require('express');
var router = express.Router();

// Registration home page
router.get('/', function(req, res, next) {
  res.render('body/home', {title: '', _layoutFile: 'layout.ejs'});
});

module.exports = router;
