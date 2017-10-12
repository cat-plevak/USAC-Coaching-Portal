'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('body/badinfo', { title: 'Error page', _layoutFile: 'layout.ejs' })
})

module.exports = router
