'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/usac-coaching'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/usac-coaching-test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
