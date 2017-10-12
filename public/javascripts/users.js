$(document).ready(() => {

  $('#reg-newcoach-button').click((e) => {
    e.preventDefault()
    console.log('button clicked');

        let data = $('#newUserForm').serialize()

        // console.log("this is the newUser data: ", data)
        $.post("/api/coaches", data, null, 'json').then((data) => {
          console.log("POSTED data", data);

          let email = data.username
          let password = data.password
          let userId = data.userId

          let options = {
                contentType: 'application/json',
                data: JSON.stringify({ email, password, userId }),
                dataType: 'json',
                type: 'POST',
                url: '/token'
              }

          $.ajax(options)
            .done((res) => {
              console.log('Ajax response: ', res);
              // window.location.href = '/'
            })
            .fail((err, res) => {
              // window.location.href = '/error'
              console.log('error', err);
              console.log('error response', res);
            })


        })
        .fail((err) => {
          // add in pop up here.. must not be blank
          console.error("THERE WAS AN ERROR WITH THE AJAX POST")
        })

        // console.log('options from register button: ', options);


  // end of click handler
  })

// end of doc ready call
})

// $(document).ready(() => {
//   console.log('document ready!')
//
//   $('#newUserForm').submit((e) => {
//     e.preventDefault()
//
//     let data = $('#newUserForm').serialize()
//
//     console.log("this is the newUser data: ", data)
//     $.post("/api/coaches", data, null, 'json').then((data) => {
//       console.log("POSTED data", data);
//       document.location = 'coach/home';
//     }).fail((err) => {
//       console.error("THERE WAS AN ERROR WITH THE AJAX POST")
//     })
//   })
//
//
// })
