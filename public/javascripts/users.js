$(document).ready(() => {

  $('#newUserForm').submit((e) => {
    e.preventDefault()

    let data = $('#newUserForm').serialize()

    $.post("/api/coaches", data, null, 'json').then((data) => {
      document.location = '/';
    }).fail((err) => {})
  })


}) // document ready
