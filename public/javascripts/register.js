$(document).ready(function(){

  $('#newUserForm').click((e) => {
    e.preventDefault()

    let email = $('#reg-email').val().trim()
    let password = $('#reg-password').val()
    let firstName = $('#reg-first-name').val()
    let lastName = $('#reg-last-name').val()
    let teamName = $('#reg-team-name').val().trim()
    let usacMemberNum = $('#reg-memnub').val()

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
          url: '/api/coaches'
        }

    console.log('options from register button: ', options);

    $.ajax(options)
      .done((res) => {
        // if email and password are bad, send to bad info page
        if (!res.username) {
          window.location.href = '/error'
        }
        // if email and password are good, login
        if (res.username != undefined) {
          // check to see if user is admin
          if (res.isAdmin == false) {
            window.location.href = '/coach/home'
          }
          else if (res.isAdmin == true) {
            window.location.href = '/admin/home'
          }
        }
      })
      .fail((err, res) => {
        window.location.href = '/error'
      })
  })

});
