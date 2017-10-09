'use strict';

// DASHBOARD VIEW FOR ANY ADMIN
// ability to search, view, and edit any coaches
const express = require('express');
const router = express.Router();

// first page is a view of all pending coaches
router.get('/', (req, res, next) => {
  res.render('coaches/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout.ejs' })
})

router.get('/pending', (req, res, next) => {
  res.render('coaches/pending', { title: 'Coaches Pending Certification', _layoutFile: 'layout.ejs' })
})

// click on certified coaches and see a list of all
router.get('/certified', (req, res, next) => {
  res.render('coaches/certified', { title: 'Certified Coaches', _layoutFile: 'layout.ejs' })
})




router.get('/:id', (req, res, next) => {
  const id = req.params.id
  // code goes here
})

router.post('/', (req, res, next) => {
  const { item } = req.body
  // code goes here
})

router.patch('/:id', (req, res, next) => {
  const id = req.params.id
  const { item } = req.body
  // code goes here
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  // code goes here
})
