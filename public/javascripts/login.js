$(document).ready(function(){


  $('#login-button').click((e) => {
    e.preventDefault()

    let email = $('#login-email').val().trim()
    let password = $('#login-pass').val()

    console.log(email, password);

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
      .done(() => {
        window.location.href = '/favorites.html';
      })
      .fail((err) => {
        console.log('error');
      })
  })

})
