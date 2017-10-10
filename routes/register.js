var express = require('express');
var router = express.Router();

// Registration home page
router.get('/', function(req, res, next) {
  res.render('body/register', { title: 'Register', _layoutFile: 'layout.ejs' });
})

router.post('/', function(req, res, next) {
  console.log('post route from register route working');
  res.render('body/coach/home', { title: 'Register', _layoutFile: 'layout.ejs' });
})

module.exports = router;
