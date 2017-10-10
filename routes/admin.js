'use strict';

// DASHBOARD VIEW FOR ANY ADMIN
// ability to search, view, and edit any coaches
const express = require('express');
const router = express.Router();

// add middleware to check if admin is admin. router.use or call the function in each route...



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


// error handling
router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.render('body/badinfo', { title: 'Error', _layoutFile: 'layout.ejs' })
  res.status(500).send('Something broke!')
})

module.exports = router
