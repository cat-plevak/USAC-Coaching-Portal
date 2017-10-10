'use strict';

const express = require('express');
const router = express.Router();


// view of all pending coaches
router.get('/', (req, res, next) => {
  res.render('body/badinfo', { title: 'Error page', _layoutFile: 'layout.ejs' })
})

module.exports = router
