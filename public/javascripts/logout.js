$(document).ready(function() {

  $('#logout-button').click((e) => {
    e.preventDefault()

    const options = {
      contentType: 'application/json',
      // data: JSON.stringify({ email, password }),
      dataType: 'json',
      type: 'GET',
      url: '/token'
    }
    $.ajax(options)
      .done((res) => {
        window.location.href = '/'
      })
      .fail((err, res) => {})
  })

});
