exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([{
          id: 1,
          username: 'coach1@gmail.com',
          hashed_password: '$2a$10$dTwA4lpkETg5mR0BbL1QZO50J1VpOBl0eEUG1heMoe9NxlSGFye0y',
          is_admin: false
        },
        {
          id: 2,
          username: 'coach2@gmail.com',
          hashed_password: '$2a$10$G4BNzRZSfvYUCgKrlI1ryu1.0sstq5JLkdguVOl6HjXOOJ9wbxADC',
          is_admin: false
        },
        {
          id: 3,
          username: 'admin1@gmail.com',
          hashed_password: '$2a$10$9lijeFkZFhuitO9oON535ursM0vRCKQie7J6VXtcu.AZLzSY8qRfG',
          is_admin: true
        },
        {
          id: 4,
          username: 'admin2@gmail.com',
          hashed_password: '$2a$10$JxVZaKx5h.I0oPIaUjhFcOk86h723w35eskDj8k0/Id1MumBNdlgW',
          is_admin: true
        }
      ])
    }).then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    })
}
