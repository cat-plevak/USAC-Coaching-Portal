const express = require('express')
const router = express.Router()
const knex = require('../..knex')
const boom = require('boom')
// const jwt = require('jsonwebtoken')
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps')

const SECRET = process.env.SECRET

// DO WE WANT AN AUTHORIZE FUNCTION IN THIS ROUTE?
// DONT THINK SO, THIS IS ONLY TO GET INFORMATION FROM DB NOT TO AUTHORIZE.

// STANDARD CURL ROUTES

router.get('/', (_req, res, next) => {
  knex('coaches')
    .orderBy('last_name', 'ASC')
    .then((coaches) => {
      res.send(camelizeKeys(coaches))
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  // code goes here
})
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  // code goes here
})

// SIGN UP AS A NEW USER HERE? BCRYPT,COOKIES? //
router.post('/', (req, res, next) => {
  const {} = req.body
  // code goes here
})

router.patch('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const {} = req.body
  // code goes here
})

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  // code goes here
})


module.exports = router
