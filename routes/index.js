var express = require('express');
var router = express.Router();

// home page
router.get('/', (req, res, next) => {
  res.render('body/home', {
    title: '',
    _layoutFile: 'layout.ejs'
  });
})

module.exports = router;
