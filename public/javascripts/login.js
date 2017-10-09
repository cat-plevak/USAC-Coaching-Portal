$(document).ready(function(){

  $('#login-button').click((e) => {
    e.preventDefault()

    let email = $('#login-email').val().trim()
    let password = $('#login-pass').val()

    console.log(email, password);

    if (!email) {
        return next(boom.create('Email must not be blank', 404))
      }

    if (email.indexOf('@') < 0) {
      return next(boom.create('Email must be valid', 404))
    }

    if (!password || password.length < 8) {
      return next(boom.create('Password must be at least 8 characters', 404))
    }


  })

});
