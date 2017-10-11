$(document).ready(() => {

  if (document.location.href.match(/coach\/home/)) {

    console.log('this is the coaches home page');
    // grab the information from the token, saved during login
    $.getJSON('/token/token').then(data => {
      let id = data.userId
      console.log(data.userId);

      // grad information from the api with the id from token
      $.getJSON(`../../api/coaches/${id}`).then(data => {
        console.log('data from api: ', data);
      })



    })


  }
  // $('#coach-dash-form')



})
