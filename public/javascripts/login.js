$(document).ready(function(){

  $('#login-button').click((e) => {
    e.preventDefault()

    let email = $('#login-email').val()
    let password = $('#login-pass').val()

    console.log(email, password);

    knex('users')
      .select('*')
      .then((data) => {
        console.log(data);
      })


  })

});
