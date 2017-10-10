'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const {
  camelizeKeys
} = require('humps');
const router = express.Router();
const SECRET = process.env.SECRET
const cookieParser = require('cookie-parser')

router.use(cookieParser())


// router.get('/', function(req, res, next) {
//   let token = req.cookies.token
//   // is there a token?
//   jwt.verify(token, SECRET, function(err, decoded) {
//     if (decoded) {
//       console.log('decoded: ', decoded);
//     res.send(true)
//     }
//     else {
//     res.send(false)
//     }
//   })
// })


router.post('/', (req, res, next) => {
  let user;

  console.log('req body from token', req.body);
  console.log('email', req.body.email);

  knex('users')
    .where('username', req.body.email)
    .first()
    .then((row) => {
      if (!row) {
        res.render('body/home', {
          title: '',
          _layoutFile: 'error.ejs'
        })
      }

      user = camelizeKeys(row);

      bcrypt.compare(req.body.password, user.hashedPassword, function(err, rep) {
        if (!rep) {
          res.render('/error', {
            title: '',
            _layoutFile: 'error.ejs'
          })
        } else {
          const token = jwt.sign({
            userId: user.id,
            isAdmin: user.is_admin
          }, SECRET)

          res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            secure: router.get('env') === 'production'
          })

          delete user.hashedPassword;

          res.send(user);
        }
      })
    })
})

module.exports = router;
