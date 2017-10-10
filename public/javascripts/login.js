$(document).ready(function(){


  $('#login-button').click((e) => {
    e.preventDefault()

    let email = $('#login-email').val().trim()
    let password = $('#login-pass').val()

    console.log(`email: ${email}, password: ${password}`);

    if (!email) {
      console.log('Email must not be blank');
        // return res.status(404).send('Email must not be blank')
      }

    if (!password) {
      console.log('Password must not be blank');
      // return res.status(404).send('Password must be at least 8 characters')
    }

    const options = {
          contentType: 'application/json',
          data: JSON.stringify({ email, password }),
          dataType: 'json',
          type: 'POST',
          url: '/token'
        }

    $.ajax(options)
      .done((res) => {
        console.log(res);
        if (!res.username) {
          window.location.href = '../error'
        }
        if (res.username != undefined) {
          window.location.href = '/coach/home'
          console.log('good');
        }
      })
      .fail((err) => {
        window.location.href = '../error'
        console.log('error');
      })
  })

})
