'use strict';

// DASHBOARD VIEW FOR INDIVIDUAL COACH
// ability to search, view, and edit any coaches
const express = require('express');
const router = express.Router();
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')


const isAuth = (req, res, next) => {
  jwt.verify(req.cookies.token, SECRET, (err, payload) => {
    if (err) {
      console.log('err, token incorrect: ', err);
      return res.render('body/badinfo', {
        title: 'Error',
        _layoutFile: 'layout.ejs'
      })
    }
    req.currentUser = payload
    next()
  })
}

// get coach by id, add edit buttons
router.get('/:id', isAuth, (req, res, next) => {
  res.render('body/coach/home', { title: 'Coach Dashboard', _layoutFile: 'layout-logout.ejs' })
})

// error handling
router.use(function(err, req, res, next) {
  console.error(err.stack)
  res.render('body/badinfo', {
    title: 'Error',
    _layoutFile: 'layout.ejs'
  })
  res.status(500).send('Something broke!')
})

module.exports = router;
