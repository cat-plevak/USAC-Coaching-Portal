exports.up = function(knex, Promise) {
  return knex.schema.createTable('coaches', (table) => {
    table.increments()
    table.integer('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index()
    table.string('last_name').notNullable().defaultTo('')
    table.string('first_name').notNullable().defaultTo('')
    table.string('team_name').notNullable().defaultTo('')
    table.string('cpr_exp_date').defaultTo('X')
    table.string('fa_exp_date').defaultTo('X')
    table.string('bg_exp_date').defaultTo('X')
    table.string('ss_exp_date').defaultTo('X')
    table.integer('usac_membership').defaultTo(0)
    table.boolean('is_certified').defaultTo(false)
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('coaches')
};
