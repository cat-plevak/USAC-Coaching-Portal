'use strict';

// DASHBOARD VIEW FOR ANY ADMIN
// ability to search, view, and edit any coaches
const express = require('express');
const router = express.Router();
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')

// add middleware to check if admin is admin
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


// view of all pending coaches
router.get('/', isAuth, (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout-logout.ejs' })
})

router.get('/pending', isAuth, (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout-logout.ejs' })
})

// click on certified coaches and see a list of all
router.get('/certified', isAuth, (req, res, next) => {
  res.render('body/admin/certified', { title: 'Certified Coaches', _layoutFile: 'layout-logout.ejs' })
})

// add new admin route
router.get('/admins', isAuth, (req, res, next) => {
  res.render('body/admin/admins', { title: 'Add Admin', _layoutFile: 'layout-logout.ejs' })
})

// send admin to home dashboard
router.get('/home/:id', isAuth, (req, res, next) => {
  console.log('hello from coach route', req.params.id);
  res.render('body/admin/home', { title: 'Admin Dash', _layoutFile: 'layout-logout.ejs' })
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

module.exports = router
