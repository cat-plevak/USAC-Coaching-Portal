exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coaches').del()
    .then(function() {
      // Inserts seed entries
      return knex('coaches').insert([{
          id: 1,
          last_name: 'doe',
          first_name: 'John',
          team_name: 'rockstars',
          cpr_exp_date: '10/09/2018',
          fa_exp_date: '10/09/2018',
          bg_exp_date: '10/05/2018',
          ss_exp_date: '10/09/2018',
          usac_membership: true,
          is_certified: true,
          user_id: 1
        },
        {
          id: 2,
          last_name: 'Sam',
          first_name: 'Smith',
          team_name: 'crushers',
          cpr_exp_date: '10/09/2018',
          fa_exp_date: '10/09/2018',
          bg_exp_date: '10/05/2018',
          ss_exp_date: '10/09/2018',
          usac_membership: false,
          is_certified: false,
          user_id: 2
        },
        {
          id: 3,
          last_name: 'Bob',
          first_name: 'Daniels',
          team_name: 'sick bird',
          cpr_exp_date: '10/09/2018',
          fa_exp_date: '10/09/2018',
          bg_exp_date: '10/05/2018',
          ss_exp_date: '10/09/2018',
          usac_membership: true,
          is_certified: false,
          user_id: 3
        },
        {
          id: 4,
          last_name: 'jane',
          first_name: 'doe',
          team_name: 'rockstars',
          cpr_exp_date: '10/09/2018',
          fa_exp_date: '10/09/2018',
          bg_exp_date: '10/05/2018',
          ss_exp_date: '10/09/2018',
          usac_membership: true,
          is_certified: true,
          user_id: 4
        }
      ])
    }).then(() => {
      return knex.raw("SELECT setval('coaches_id_seq', (SELECT MAX(id) FROM coaches))")
    })
}
