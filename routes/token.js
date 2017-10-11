'use strict';

const boom = require('boom')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const {
  camelizeKeys
} = require('humps')

const router = express.Router();
const SECRET = process.env.SECRET
const cookieParser = require('cookie-parser')

router.use(cookieParser())

// logout function, check for cookie and clear
router.get('/', function(req, res, next) {
  let token = req.cookies.token

  jwt.verify(token, SECRET, function(err, decoded) {
    if (decoded) {
    res.clearCookie('token')
    res.send(true)
    }
    else {
    res.send({})
    }
  })
})

// provides information from the token to coaches & admin javascripts
router.get('/token', function(req, res, next) {
  let token = req.cookies.token

  jwt.verify(token, SECRET, function(err, decoded) {
    if (decoded) {
    res.clearCookie('token')
    res.send(decoded)
    }
    else {
    res.send({})
    }
  })
})

// create new token during login
// set expiration time or cookie session...
router.post('/', (req, res, next) => {
  let user;

  // check to see if email/user exists in database
  knex('users')
    .where('username', req.body.email)
    .first()
    .then((row) => {
      // if email doesn't exist, reroute to error page
      if (!row) {
        res.send({})
      }
      // if email is good, check password
      else if (row != undefined) {
        user = camelizeKeys(row);

        bcrypt.compare(req.body.password, user.hashedPassword, function(err, rep) {
          // if password doesn't match, send to bad info page
          if (!rep) {
            res.send({})

          // if password matches email, create cookie token
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
            // remove password from response
            delete user.hashedPassword;
            res.send(user);
          }
        })
      }
    })
})

module.exports = router;
