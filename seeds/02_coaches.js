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
          cpr_exp_date: '2018/9/10',
          fa_exp_date: '2018/9/10',
          bg_exp_date: '2018/9/10',
          ss_exp_date: '2018/9/10',
          usac_membership: true,
          is_certified: true
        },
        {
          id: 2,
          last_name: 'Sam',
          first_name: 'Smith',
          team_name: 'crushers',
          cpr_exp_date: '2018/9/10',
          fa_exp_date: '2018/9/10',
          bg_exp_date: '2018/9/10',
          ss_exp_date: '2018/9/10',
          usac_membership: false,
          is_certified: true
        },
        {
          id: 3,
          last_name: 'Bob',
          first_name: 'Daniels',
          team_name: 'rockstars',
          cpr_exp_date: '2018/9/10',
          fa_exp_date: '2018/9/10',
          bg_exp_date: '2018/9/10',
          ss_exp_date: '2018/9/10',
          usac_membership: true,
          is_certified: true
        },
        {
          id: 4,
          last_name: 'doe',
          first_name: 'John',
          team_name: 'rockstars',
          cpr_exp_date: '2018/9/10',
          fa_exp_date: '2018/9/10',
          bg_exp_date: '2018/9/10',
          ss_exp_date: '2018/9/10',
          usac_membership: true,
          is_certified: true
        }
      ])
    }).then(() => {
      return knex.raw("SELECT setval('coaches_id_seq', (SELECT MAX(id) FROM coaches))")
    })
}
