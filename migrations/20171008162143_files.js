
exports.up = function(knex, Promise) {
  return knex.schema.createTable('files', function(table) {
    table.increments()
    table.integer('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index()
    table.text('cpr_link')
    table.text('fa_link')
    table.text('ss_link')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('files')
};
