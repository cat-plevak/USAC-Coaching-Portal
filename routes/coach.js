'use strict';

const express = require('express');
const router = express.Router();
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')

// middleware security to access routes
const isAuth = (req, res, next) => {
  jwt.verify(req.cookies.token, SECRET, (err, payload) => {
    if (err) {
      return res.render('body/badinfo', {
        title: 'Error',
        _layoutFile: 'layout.ejs'
      })
    }
    req.currentUser = payload
    next()
  })
}

// get coach by id
router.get('/:id', isAuth, (req, res, next) => {
  res.render('body/coach/home', { title: 'Coach Dashboard', _layoutFile: 'layout-logout.ejs' })
})

// get coach by id
router.get('/home/:id', isAuth, (req, res, next) => {
  res.render('body/coach/home', { title: 'Coach Dashboard', _layoutFile: 'layout-logout.ejs' })
})

// error handling
router.use(function(err, req, res, next) {
  res.render('body/badinfo', {
    title: 'Error',
    _layoutFile: 'layout.ejs'
  })
  res.status(500).send('Something broke!')
})

module.exports = router;
