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

  // check to see if email/user exists in database
  knex('users')
    .where('username', req.body.email)
    .first()
    .then((row) => {
      // if email doesn't exist, reroute to error page
      if (!row) {
        console.log('bad info should send to bad info page');
        // ERROR, CANT FIND BAD INFO PAGE.. BAD ROUTE...
        return res.send('email does not exist, please sign up')
        return res.render('body/badinfo', {
          title: '', _layoutFile: 'body/badinfo.ejs'
        })
      }
      // if email is good, check password
      else if (row != undefined) {
        user = camelizeKeys(row);

        console.log('good email, check password');
        bcrypt.compare(req.body.password, user.hashedPassword, function(err, rep) {
          // if password doesn't match, send to bad info page
          // ERROR CANT FIND BADINFO PAGE, ROUTE INCORRECT
          if (!rep) {
            console.log('bad passord: ', rep);
            res.render('badinfo', {
              title: '',
              _layoutFile: 'badinfo.ejs'
            })
          // if password matches email, create cookie token
          } else {
            console.log('password good: ', rep);

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
