const express = require('express')
const knex = require('../../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps')

const SECRET = process.env.SECRET

const router = express.Router()

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

router.get('/certified', (req, res, next) => {
  knex('coaches')
    .orderBy('last_name', 'ASC')
    .where('is_certified', true)
    .then((coaches) => {
      res.send(camelizeKeys(coaches))
    })
    .catch((err) => {
      next(err)
    })
})
router.get('/pending', (req, res, next) => {
  knex('coaches')
    .orderBy('last_name', 'ASC')
    .where('is_certified', false)
    .then((coaches) => {
      res.send(camelizeKeys(coaches))
    })
    .catch((err) => {
      next(err)
    })
})
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next(boom.create(400, 'id must be a number'))
  }

  knex('coahces')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404, 'Fruit not found'))
      }

      return knex('coaches')
        .where('id', id)
        .first()
        .then((coach) => {
          res.send(camelizeKeys(coach))
        })
    })
    .catch((err) => {
      next(err)
    })
})

// SIGN UP AS A NEW USER HERE? BCRYPT,COOKIES? //
router.post('/', (req, res, next) => {
  const {
    lastName,
    firstName,
    teamName,
    cprExpDate,
    faExpDate,
    ssExpDate,
    usacMembership,
    isCertified,
    userId
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
  // if (!cprExpDate || !cprExpDate.trim()) {
  //   return next(boom.create(404, 'cprExpDate error'))
  // }
  // if (!faExpDate || !faExpDate.trim()) {
  //   return next(boom.create(404, 'faExpDate error'))
  // }
  // if (!ssExpDate || !ssExpDate.trim()) {
  //   return next(boom.create(404, 'ssExpDate error'))
  // }

  let insertCaoch = {
    lastName,
    firstName,
    teamName,
    cprExpDate,
    faExpDate,
    ssExpDate,
    usacMembership,
    isCertified,
    userId
  }
  console.log('insertCaoch is:', decamelizeKeys(insertCaoch))

  knex('coaches')
    .insert(decamelizeKeys(insertCaoch))
    .then(() => {
      res.send(insertCaoch)
    })
    .catch((err) => {
      next(err)
    })
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
