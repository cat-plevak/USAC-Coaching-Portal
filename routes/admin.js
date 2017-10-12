'use strict';

const express = require('express');
const router = express.Router();
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')

// middleware to check if admin is admin
const isAuth = (req, res, next) => {
  jwt.verify(req.cookies.token, SECRET, (err, payload) => {
    if (err) {
      return res.render('body/badinfo', {
        title: 'Error',
        _layoutFile: 'layout.ejs'
      })
    }
    if (payload.isAdmin == false) {
      return res.render('body/badinfo', {
        title: 'Error',
        _layoutFile: 'layout.ejs'
      })
    }
    else {
      req.currentUser = payload
      next()
    }
  })
}

// view of all coaches on admin dash
router.get('/', isAuth, (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout-logout.ejs' })
})

// view all pending coaches
router.get('/pending', isAuth, (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout-logout.ejs' })
})

// view all certified coaches
router.get('/certified', isAuth, (req, res, next) => {
  res.render('body/admin/certified', { title: 'Certified Coaches', _layoutFile: 'layout-logout.ejs' })
})

// add new admin route
router.get('/admins', isAuth, (req, res, next) => {
  res.render('body/admin/admins', { title: 'Add Admin', _layoutFile: 'layout-logout.ejs' })
})

// get admin by id
router.get('/home/:id', isAuth, (req, res, next) => {
  res.render('body/admin/home', { title: 'Admin Dash', _layoutFile: 'layout-logout.ejs' })
})

// send admin to home dashboard
router.get('/:id', isAuth, (req, res, next) => {
  res.render('body/admin/home', { title: 'Admin Dash', _layoutFile: 'layout-logout.ejs' })
})

// send admin to specific coach edit view
router.get('/:id/edit', isAuth, (req, res, next) => {
  res.render('body/admin/coach', { title: 'Admin Dash', _layoutFile: 'layout-logout.ejs' })
})

// error handling
router.use(function(err, req, res, next) {
  res.render('body/badinfo', {
    title: 'Error',
    _layoutFile: 'layout.ejs'
  })
  res.status(500).send('Something broke!')
})

module.exports = router
