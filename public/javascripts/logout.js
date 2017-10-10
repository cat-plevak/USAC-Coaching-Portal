$(document).ready(function(){

  $('#logout-button').click((e) => {
    e.preventDefault()

    const options = {
          contentType: 'application/json',
          // data: JSON.stringify({ email, password }),
          dataType: 'json',
          type: 'GET',
          url: '/token'
        }
    console.log('options from logout button: ', options);

    $.ajax(options)
      .done((res) => {
        console.log('Ajax response: ', res);
        window.location.href = '/'
      })
      .fail((err, res) => {
        // window.location.href = '/error'
        console.log('error', err);
        console.log('error response', res);
      })

  })

});
