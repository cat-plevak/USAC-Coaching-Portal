var express = require('express');
var router = express.Router();

// Registration home page
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('body/home', {title: '', _layoutFile: 'layout.ejs'});
});
=======
  res.render('body/home', { title: '', _layoutFile: 'layout.ejs' });
})
>>>>>>> 06689688b9313c230e357e2121471207531a9b93

module.exports = router;
