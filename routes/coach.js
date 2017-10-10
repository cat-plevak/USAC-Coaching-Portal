'use strict'

// DASHBORD VIEW FOR AN INDIVIDUAL COACH
// ability to edit their own info and resubmit
var express = require('express');
var router = express.Router();

// get coach by id, add edit buttons
router.get('/:id', (req, res, next) => {
  res.render('body/coach/home', { title: 'Coach Dashboard', _layoutFile: 'layout-logout.ejs' })
})


module.exports = router;
