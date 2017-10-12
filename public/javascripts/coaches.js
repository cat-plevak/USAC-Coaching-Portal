$(document).ready(() => {
  console.log('coaches SJ file loaded')
  if (document.location.href.match(/coach\/home/)) {
    let string = window.location.href
    let userId = string.substring(string.lastIndexOf('/') + 1, string.length)

    // grab information from the api with the id from token
    $.getJSON(`../../api/coaches/${userId}`).then(data => {

      // set the form values to match the database info
      $('#coach-dash-firstname').val(data.firstName)
      $('#coach-dash-lastname').val(data.lastName)
      $('#coach-dash-teamname').val(data.teamName)
      $('#coach-dash-usacmem').val(data.usacMembership)

      // change certifed status from true/false to words
      if (data.isCertified == true) {
        $('#coach-dash-is_certified').html('<h4 style="color:green;">You are a USAC CERTIFIED COACH!</h4>')
      } else {
        $('#coach-dash-is_certified').html('<h4 style="color:red;">You are NOT certified</h4>')
      }

      // date form fields, check to see if value is null
      // CPR date check and set value
      let cprDate = $('#coach-dash-cprExpDate').val()
      if (cprDate != 'X') {
        $('#coach-dash-cprExpDate').val(data.cprExpDate)
      }
      // first aid date check and set value
      let faDate = $('#coach-dash-faExpDate').val()
      if (faDate != 'X') {
        $('#coach-dash-faExpDate').val(data.faExpDate)
      }
      // first aid date check and set value
      let ssDate = $('#coach-dash-ssExpDate').val()
      if (ssDate != 'X') {
        $('#coach-dash-ssExpDate').val(data.ssExpDate)
      }

      // listen for click on update button
      $('#coach-dash-update-button').click((e) => {
        e.preventDefault()
        console.log('button clicked');
        console.log($('#coach-dash-firstname').val());

        // grab new values from fields
        let firstName = $('#coach-dash-firstname').val()
        let lastName = $('#coach-dash-lastname').val()
        let teamName = $('#coach-dash-teamname').val()
        let usacMembership = $('#coach-dash-usacmem').val()
        let cprExpDate = $('#coach-dash-cprExpDate').val()
        let faExpDate = $('#coach-dash-faExpDate').val()
        let ssExpDate = $('#coach-dash-ssExpDate').val()

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({
            firstName,
            lastName,
            teamName,
            usacMembership,
            cprExpDate,
            faExpDate,
            ssExpDate
          }),
          dataType: 'json',
          type: 'PATCH',
          url: `../../api/coaches/${userId}`
        }

        $.ajax(options)
          .done(res => {
            $('#hidden-pop').removeClass('hidden')
            $('#hidden-pop').on('animationend', () => {

              setTimeout(function() {
                $('#hidden-pop').addClass('hidden')
              }, 1100);
            })
          })
          .fail((err, res) => {
            window.location.href = '../../error'
          })
        // end of update button click function
      })

      // end of api call for individual coach
    })

    // WIDGET BUTTONS //

    $.cloudinary.config({
      cloud_name: 'usa-climbing-coaching-portal',
      api_key: '496724254771919',
    })

    let CprFileButton = $('#CprFileButton')
    let FaFileButton = $('#FaFileButton')
    let SsFileButton = $('#SsFileButton')

    function processImage(id) {
      var options = {
        client_hints: true,
      }
      return $.cloudinary.url(id, options)
    }

    // CPR Upload button event
    CprFileButton.on('click', function(e) {
      e.stopPropagation()
      e.preventDefault()
      // Initiate upload
      cloudinary.openUploadWidget({
          cloud_name: 'usa-climbing-coaching-portal',
          upload_preset: 'USACcoach',
          tags: ['cgal']
        },
        function(error, result) {
          if (error) console.log(error)
          // If NO error, log image data to console
          let id = result[0].public_id
          console.log(processImage(id))

          let cprLink = processImage(id)

          // MAKE THE AJAX PATCH CALL TO UDATE THE DB
          const cprOptions = {
            contentType: 'application/json',
            data: JSON.stringify({
              cprLink
            }),
            dataType: 'json',
            type: 'PATCH',
            url: `../../api/coaches/${userId}`
          }
          $.ajax(cprOptions)
            .done((res) => {
              console.log('DONE WITH FILE CPR LINK THE PATCH TO DB')
            }).fail((err, res) => {
              window.location.href = '../../error'
            })
        })
    })


    // First Aid Upload button event
    FaFileButton.on('click', function(e) {
      e.stopPropagation()
      e.preventDefault()
      // Initiate upload
      cloudinary.openUploadWidget({
          cloud_name: 'usa-climbing-coaching-portal',
          upload_preset: 'USACcoach',
          tags: ['cgal']
        },
        function(error, result) {
          if (error) console.log(error)
          // If NO error, log image data to console
          var id = result[0].public_id
          console.log('This is the image URL', processImage(id))

          let faLink = processImage(id)

          // MAKE THE AJAX PATCH CALL TO UDATE THE DB
          const faOptions = {
            contentType: 'application/json',
            data: JSON.stringify({
              faLink
            }),
            dataType: 'json',
            type: 'PATCH',
            url: `../../api/coaches/${userId}`
          }
          $.ajax(faOptions)
            .done((res) => {
              console.log('DONE WITH FILE First Aid LINK THE PATCH TO DB')
            }).fail((err, res) => {
              window.location.href = '../../error'
            })


        })
    })


    // Safe Sport Upload button event
    SsFileButton.on('click', function(e) {
      e.stopPropagation()
      e.preventDefault()
      // Initiate upload
      cloudinary.openUploadWidget({
          cloud_name: 'usa-climbing-coaching-portal',
          upload_preset: 'USACcoach',
          tags: ['cgal']
        },
        function(error, result) {
          if (error) console.log(error)
          // If NO error, log image data to console
          var id = result[0].public_id
          console.log('This is the image URL', processImage(id))

          let ssLink = processImage(id)

          // MAKE THE AJAX PATCH CALL TO UDATE THE DB
          const ssOptions = {
            contentType: 'application/json',
            data: JSON.stringify({
              ssLink
            }),
            dataType: 'json',
            type: 'PATCH',
            url: `../../api/coaches/${userId}`
          }
          $.ajax(ssOptions)
            .done((res) => {
              console.log('DONE WITH FILE Safe Sport LINK THE PATCH TO DB')
            }).fail((err, res) => {
              window.location.href = '../../error'
            })
        })
    })

    // END WIDGET BUTTONS //

    //end of if window location matches coaches home
  }

  // end of document ready call
})
