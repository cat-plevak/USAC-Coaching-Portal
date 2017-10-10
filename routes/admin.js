'use strict';

// DASHBOARD VIEW FOR ANY ADMIN
// ability to search, view, and edit any coaches
const express = require('express');
const router = express.Router();
const SECRET = process.env.SECRET
// add middleware to check if admin is admin. router.use or call the function in each route...
const isAuth = (req, res, next) => {
  jwt.verify(req.cookies.token, SECRET, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'))
    }
    // console.log('PAYLOAD: ', payload)
    // console.log('PAYOAD ID', payload.userId);

    // currentUser = payload
    req.currentUser = payload

    // console.log('req.currentUser: ', req.currentUser);
    // console.log('currentUser at isAuth: ', currentUser)
    // console.log('req.claim==', req.claim);
    next()
  })

}


// view of all pending coaches
router.get('/', (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout-logout.ejs' })
})

router.get('/pending', (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout-logout.ejs' })
})

// click on certified coaches and see a list of all
router.get('/certified', (req, res, next) => {
  res.render('body/admin/certified', { title: 'Certified Coaches', _layoutFile: 'layout-logout.ejs' })
})

// send admin to home dashboard
router.get('/:id', (req, res, next) => {
  res.render('body/admin/home', { title: 'Admin Dash', _layoutFile: 'layout-logout.ejs' })
})

// add new admin route
router.get('/add_admin', (req, res, next) => {
  console.log('head to admin page')
  res.render('body/admin/add_admin', { title: 'Add Admin', _layoutFile: 'layout-logout.ejs' })
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
