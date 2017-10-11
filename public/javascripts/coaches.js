$(document).ready(() => {
  console.log('document ready!')



  if (document.location.href.match(/certified$/)) {

    $.getJSON("/api/coaches/:id").then(data => {
      console.log(data);
    })
  }
  // $('#coach-dash-form')



})
