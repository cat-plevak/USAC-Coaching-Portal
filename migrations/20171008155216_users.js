
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments()
    table.string('username').unique().notNullable()
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.boolean('is_admin').default(false)
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
