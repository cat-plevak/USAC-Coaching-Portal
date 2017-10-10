'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const router = express.Router();
const SECRET = process.env.SECRET

router.get('/', function(req, res, next) {
  let token = req.cookies.token
  // is there a token?
  jwt.verify(token, SECRET, function(err, decoded) {
    if (decoded) {
    res.send(true)
    }
    else {
    res.send(false)
    }
    return res.status(200)
  })
})



router.post('/', (req, res, next) => {
  let user;
  console.log('secret: ', SECRET);
  console.log('req body from token', req.body);
  console.log('email', req.body.email);

  knex('users')
    .where('username', req.body.email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad email or password');
      }
      console.log('row', row);
      user = camelizeKeys(row);

      return bcrypt.compare(req.body.password, user.hashedPassword);
    })
    .then(() => {
      // const claim = { userId: user.id };

      const token = jwt.sign({
        userId: user.id,
        isAdmin: user.is_admin
      }, SECRET)

      res.cookie('token', token, {
        httpOnly: true,
        // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        // secure: router.get('env') === 'production'
      })

      delete user.hashedPassword;

      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () =>{
      throw boom.create(400, 'Bad email or password');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
