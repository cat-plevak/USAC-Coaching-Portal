$(document).ready(() => {
  console.log('document ready!')

  $('#newUserForm').submit((e) => {
    e.preventDefault()

    let data = $('#newUserForm').serialize()

    console.log("this is the newUser data: ", data)
    // $.post("/api/v1/students", data, null, 'json').then((data) => {
    //   console.log("POSTED data", data);
    //   document.location = '/students';
    // }).fail((err) => {
    //   $('#errorMessage').html(`<div class="alert alert-danger" role="alert">
    //     ${err.responseText}</div>`)
    // })
  })


})
