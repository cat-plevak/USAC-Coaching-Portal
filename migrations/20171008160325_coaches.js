
exports.up = function(knex, Promise) {
  return knex.schema.createTable('coaches', function(table) {
    table.increments()
    table.integer('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index()
    table.string('last_name').notNullable().defaultTo('')
    table.string('first_name').notNullable().defaultTo('')
    table.string('team_name').notNullable().defaultTo('')
    table.date('cpr_exp_date')
    table.date('fa_exp_date')
    table.date('bg_exp_date')
    table.date('ss_exp_date')
    table.boolean('usac_membership').defaultTo(false)
    table.boolean('is_certified').defaultTo(false)
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('coaches')
};
