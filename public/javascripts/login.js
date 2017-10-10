$(document).ready(function(){

// listener on login button
  $('#login-button').click((e) => {
    e.preventDefault()

    let email = $('#login-email').val().trim()
    let password = $('#login-pass').val()

    console.log(`email: ${email}, password: ${password}`);

    if (!email) {
      console.log('Email must not be blank');
        window.location.href = '/badinfo'
        return res.status(404).send('Email must not be blank')
      }

    if (!password) {
      console.log('Password must not be blank');
      window.location.href = '/badinfo'
      return res.status(404).send('Password must be at least 8 characters')
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
        console.log('Ajax response: ', res);
        console.log('is admin?: ', res.isAdmin);
        // if email and password are bad, send to bad info page
        if (!res.username) {
          window.location.href = 'badinfo'
        }
        // if email and password are good, login
        if (res.username != undefined) {
          // check to see if user is admin
          if (res.isAdmin == false) {
            console.log('good info, login as coach');
            window.location.href = '/coach/home'
          }
          else if (res.isAdmin == true) {
            console.log('good info, login as admin');
            window.location.href = '/admin/home'
          }
        }
      })
      .fail((err) => {
        window.location.href = '/badinfo'
        console.log('error');
      })
  })

})
