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
              isAdmin: user.isAdmin
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

// create a new token on sign up
router.post('/register', (req, res, next) => {
  let user = {}
  console.log(req.body);

  const {
    username,
    password
  } = req.body

  // console.log("\n the USERS request body is : ", req.body)

  // console.log("\nusername and password for users table: ", username, password)

  if (!username || !username.trim()) {
    return next(boom.create(400, 'Email must not be blank'))
  }

  if (!password || password.length < 4) {
    return next(boom.create(400, 'Password must be at least 4 characters long'))
  }

  knex('users')
    .where('username', username)
    .first()
    .then((row) => {
      if (row) {
        return next(boom.create(404, 'Coach already exist!'))
      }

      return bcrypt.hash(password, 10)
    }).then((hash) => {

      // console.log('\nTHE HASHED PASSWORD IS: ', hash)

      return knex('users')
        .insert({
          username,
          hashed_password: hash
        }, '*')
    }).then((newUser) => {
      // console.log("\nTHE NEW USER IS: ", newUser)
      const userId = newUser[0].id
      // console.log("\nThe user ID is: ", userId)
      // console.log("\n the COACHES request body is : ", req.body)
      const {
        lastName,
        firstName,
        teamName,
      } = camelizeKeys(req.body)

      if (!lastName || !lastName.trim()) {
        return next(boom.create(404, 'Please provide last name'))
      }
      if (!firstName || !firstName.trim()) {
        return next(boom.create(404, 'Please provide first name'))
      }
      if (!teamName || !teamName.trim()) {
        return next(boom.create(404, 'Please provide a team name'))
      }

      let insertCoach = {
        lastName,
        firstName,
        teamName,
        userId
      }

      // console.log('\n INSERT COACH IS : ', decamelizeKeys(insertCoach))

      return knex('coaches')
        .insert(decamelizeKeys(insertCoach), '*')

    }).then((row) => {
      // console.log('THIS IS THE ROW AFTER insertCoach: ', row)
      res.send(camelizeKeys(row[0]))
    })
    .catch((err) => {
      // console.log('THERE WAS AN ERROR WITH API', err);
      next(err)
    })

  // // encrypt password from request
  // let hashPass = bcrypt.hash(req.body.password, 10)
  // console.log('NEW USER HASH PASS', hashPass);
  // // create a new token with user id and is admin
  // const token = jwt.sign({
  //   userId: user.id,
  //   hashed_password: hashPass,
  //   isAdmin: user.isAdmin
  // }, SECRET)
  //
  // res.cookie('token', token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  //   secure: router.get('env') === 'production'
  // })
  // // remove password from response
  // res.send(user);


})

module.exports = router;
