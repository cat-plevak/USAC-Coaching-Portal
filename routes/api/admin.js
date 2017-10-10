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

router.get('/', (_req, res, next) => {
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
