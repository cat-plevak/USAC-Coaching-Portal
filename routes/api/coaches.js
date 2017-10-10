const express = require('express')
const knex = require('../../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps')
const bcrypt = require('bcrypt')

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

  knex('coaches')
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
    username,
    password
  } = req.body

  bcrypt.hash(password, 10).then((hash) => {

    return knex('users')
      .insert({
        username,
        hashed_password: hash
      }, '*')
      .then((user) => {
        // console.log('user is:', user);

        // console.log('newUser with camel is:', humps.camelizeKeys(newUser));
        // res.setHeader('Content-Type', 'application/json')
        res.send(humps.camelizeKeys(user))
      })
      .catch((err) => next(err))

  })

})

router.patch('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id)

  if (Number.isNaN(id)) {
    return next()
  }

  knex('coaches')
    .where('id', id)
    .first()
    .then((coach) => {
      if (!coach) {
        return next(boom.create(404, 'Coach Not Found'))
      }

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

      const updateCaoch = {}

      if (lastName) {
        updateBook.lastName = lastName
      }

      if (firstName) {
        updateBook.firstName = firstName
      }

      if (teamName) {
        updateBook.teamName = teamName
      }

      if (cprExpDate) {
        updateBook.cprExpDate = cprExpDate
      }

      if (faExpDate) {
        updateBook.faExpDate = faExpDate
      }
      if (ssExpDate) {
        updateBook.ssExpDate = ssExpDate
      }
      if (usacMembership) {
        updateBook.usacMembership = usacMembership
      }
      if (isCertified) {
        updateBook.isCertified = isCertified
      }

      return knex('coaches')
        .update(decamelizeKeys(updateCaoch), '*')
        .where('id', id)
    })
    .then((rows) => {
      const coach = camelizeKeys(rows[0])

      res.send(coach)
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next(boom.create(400), 'id must be a number')
  }

  let coach

  knex('coaches')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404), 'Coach not found')
      }

      coach = row

      return knex('coaches')
        .del()
        .where('id', id)
    })
    .then(() => {
      res.send(coach)
    })
    .catch((err) => {
      next(err)
    })
})

// original post script

// const {
//   lastName,
//   firstName,
//   teamName,
//   cprExpDate,
//   faExpDate,
//   ssExpDate,
//   usacMembership,
//   isCertified,
//   userId
// } = camelizeKeys(req.body)
//
// if (!lastName || !lastName.trim()) {
//   return next(boom.create(404, 'Please provide last name'))
// }
// if (!firstName || !firstName.trim()) {
//   return next(boom.create(404, 'Please provide first name'))
// }
// if (!teamName || !teamName.trim()) {
//   return next(boom.create(404, 'Please provide a team name'))
// }
//
// let insertCaoch = {
//   lastName,
//   firstName,
//   teamName,
//   cprExpDate,
//   faExpDate,
//   ssExpDate,
//   usacMembership,
//   isCertified,
//   userId
// }
//
// console.log('insertCaoch is:', decamelizeKeys(insertCaoch))
//
// knex('coaches')
//   .insert(decamelizeKeys(insertCaoch))
//   .then(() => {
//     res.send(insertCaoch)
//   })
//   .catch((err) => {
//     next(err)
//   })

module.exports = router
