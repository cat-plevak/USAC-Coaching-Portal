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

// admin homepage view pending coaches
router.get('/home', (_req, res, next) => {
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

// admin view of certified coaches
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

// admin view of pending coaches
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
        return next(boom.create(404, 'Coach not found'))
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

// post a new user
router.post('/', (req, res, next) => {

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
        cprExpDate,
        faExpDate,
        ssExpDate,
        usacMembership,
        isCertified,
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
        cprExpDate,
        faExpDate,
        ssExpDate,
        usacMembership,
        isCertified,
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
        cprLink,
        faLink,
        ssLink,
      } = camelizeKeys(req.body)

      const updateCaoch = {}

      if (lastName) {
        updateCaoch.lastName = lastName
      }

      if (firstName) {
        updateCaoch.firstName = firstName
      }

      if (teamName) {
        updateCaoch.teamName = teamName
      }

      if (cprExpDate) {
        updateCaoch.cprExpDate = cprExpDate
      }

      if (faExpDate) {
        updateCaoch.faExpDate = faExpDate
      }
      if (ssExpDate) {
        updateCaoch.ssExpDate = ssExpDate
      }
      if (usacMembership) {
        updateCaoch.usacMembership = usacMembership
      }
      if (isCertified) {
        updateCaoch.isCertified = isCertified
      }
      if (cprLink) {
        updateCaoch.cprLink = cprLink
      }
      if (faLink) {
        updateCaoch.faLink = faLink
      }
      if (ssLink) {
        updateCaoch.ssLink = ssLink
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


module.exports = router
