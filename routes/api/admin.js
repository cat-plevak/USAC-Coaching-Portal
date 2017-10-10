const express = require('express')
const knex = require('../../knex')
const boom = require('boom')
const bcrypt = require('bcrypt')

const {
  camelizeKeys,
  decamelizeKeys
} = require('humps')

const router = express.Router()

// STANDARD CURL ROUTES

// router.get('/', (_req, res, next) => {
//   knex('users')
//     .orderBy('id', 'ASC')
//     .where('is_admin', true)
//     .then((admins) => {
//       console.log('admins from api: ', admins)
//       res.send(camelizeKeys(admins))
//     })
//     .catch((err) => {
//       next(err)
//     })
// })

router.get('/add_admin', (_req, res, next) => {
  console.log('add admin route working from api');
  knex('users')
    .orderBy('id', 'ASC')
    .where('is_admin', true)
    .then((admins) => {
      console.log('admins from api: ', admins)
      res.send(camelizeKeys(admins))
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
