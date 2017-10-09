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
          cpr_exp_date: '2018/09/10',
          fa_exp_date: '2018/09/10',
          bg_exp_date: '2018/05/10',
          ss_exp_date: '2018/09/10',
          usac_membership: true,
          is_certified: true
        },
        {
          id: 2,
          last_name: 'Sam',
          first_name: 'Smith',
          team_name: 'crushers',
          cpr_exp_date: '2018/09/10',
          fa_exp_date: '2018/09/10',
          bg_exp_date: '2018/09/10',
          ss_exp_date: '2018/09/10',
          usac_membership: false,
          is_certified: false
        },
        {
          id: 3,
          last_name: 'Bob',
          first_name: 'Daniels',
          team_name: 'sick bird',
          cpr_exp_date: '2018/009/10',
          fa_exp_date: '2018/12/10',
          bg_exp_date: '2018/09/10',
          ss_exp_date: '2018/12/10',
          usac_membership: true,
          is_certified: false
        },
        {
          id: 4,
          last_name: 'jane',
          first_name: 'doe',
          team_name: 'rockstars',
          cpr_exp_date: '2018/09/10',
          fa_exp_date: '2018/08/10',
          bg_exp_date: '2018/09/10',
          ss_exp_date: '2018/09/10',
          usac_membership: true,
          is_certified: true
        }
      ])
    }).then(() => {
      return knex.raw("SELECT setval('coaches_id_seq', (SELECT MAX(id) FROM coaches))")
    })
}
