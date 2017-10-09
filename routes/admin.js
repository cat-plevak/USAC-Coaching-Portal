'use strict';

// DASHBOARD VIEW FOR ANY ADMIN
// ability to search, view, and edit any coaches
const express = require('express');
const router = express.Router();

// first page is a view of all pending coaches
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

module.exports = router
