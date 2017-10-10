'use strict';

// DASHBOARD VIEW FOR ANY ADMIN
// ability to search, view, and edit any coaches
const express = require('express');
const router = express.Router();

// add middleware to check if admin is admin. router.use or call the function in each route...

// send admin to home page
router.get('/home', (err, req, res, next) => {
  if (err) {
    console.log('oh shit!!');
    res.render('body/badinfo', { title: 'Bad Info', _layoutFile: 'layout.ejs' })
  }
  res.render('body/admin/home', { title: 'Admin Dash', _layoutFile: 'layout.ejs' })
})

// view of all pending coaches
router.get('/', (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout.ejs' })
})

router.get('/pending', (req, res, next) => {
  res.render('body/admin/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout.ejs' })
})

// click on certified coaches and see a list of all
router.get('/certified', (req, res, next) => {
  res.render('body/admin/certified', { title: 'Certified Coaches', _layoutFile: 'layout.ejs' })
})

// view a single coach, add edit buttons
router.get('/:id', (req, res, next) => {
  res.render('body/admin/coach', { title: 'View Coach', _layoutFile: 'layout.ejs' })
})

// add new admin route


// error handling
router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.render('body/badinfo', { title: 'Error', _layoutFile: 'layout.ejs' })
  res.status(500).send('Something broke!')
})

module.exports = router
