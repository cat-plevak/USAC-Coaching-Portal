$(document).ready(() => {

  if (document.location.href.match(/coach\/home/)) {

    console.log('this is the coaches home page');
    // grab the information from the token, saved during login
    // look up json web token javascript library
      // verify token and get payload...
    $.getJSON('/token/token').then(data => {
      let id = data.userId
      console.log(data.userId);

      // grab information from the api with the id from token
      $.getJSON(`../../api/coaches/${id}`).then(data => {
        console.log('data from api: ', data);
        console.log('certified or not', data.isCertified);
        // set the form values to match the database info
        $('#coach-dash-firstname').val(data.firstName)
        $('#coach-dash-lastname').val(data.lastName)
        $('#coach-dash-teamname').val(data.teamName)
        $('#coach-dash-usacmem').val(data.usacMembership)

        // change certifed status from true/false to words
        // console.log(data.isCertified);
        // console.log(status);
        // $('#coach-dash-is_certified').innerHTML('You are a USAC CERTIFIED COACH!')
        // if (data.isCertified == true) {
        //   return $('#coach-dash-is_certified').val('You are a USAC CERTIFIED COACH!')
        // }
        // else {
        //   return $('#coach-dash-is_certified').val('You are a NOT certified')
        // }

        // date form fields, check to see if value is null
        // CPR date check and set value
        let cprDate = $('#coach-dash-cprExpDate').val()
        if (cprDate != 'X') {
          return $('#coach-dash-cprExpDate').val(data.cprExpDate)
        }
        // first aid date check and set value
        let faDate = $('#coach-dash-faExpDate').val()
        if (faDate != 'X') {
          return $('#coach-dash-faExpDate').val(data.faExpDate)
        }
        // first aid date check and set value
        let ssDate = $('#coach-dash-ssExpDate').val()
        if (ssDate != 'X') {
          return $('#coach-dash-ssExpDate').val(data.ssExpDate)
        }




      })



    })


  }



})
