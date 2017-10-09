exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coaches').del()
    .then(function() {
      // Inserts seed entries
      return knex('coaches').insert([{
          id: 1,
          colName: 'rowValue1'
        },
        {
          id: 2,
          colName: 'rowValue2'
        },
        {
          id: 3,
          colName: 'rowValue3'
        }
      ])
    }).then(() => {
      return knex.raw("SELECT setval('coaches_id_seq', (SELECT MAX(id) FROM coaches))")
    })
}
