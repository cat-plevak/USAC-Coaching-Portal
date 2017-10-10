const express = require('express')
const knex = require('../../knex')
const boom = require('boom')
const bcrypt = require('bcrypt')

const {
  camelizeKeys,
  decamelizeKeys
} = require('humps')

const router = express.Router()


// get current admins
router.get('/admins', (_req, res, next) => {
  knex('users')
    .orderBy('id', 'ASC')
    .where('is_admin', true)
    .then((admins) => {
      res.send(camelizeKeys(admins))
    })
    .catch((err) => {
      next(err)
    })
})

// post a new admin to users table
router.post('/admins', (_req, res, next) => {

  const {
    username,
    password
  } = req.body

  console.log("\n the USERS request body is : ", req.body)

})
