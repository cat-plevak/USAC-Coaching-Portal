$(document).ready(() => {
  console.log('document ready!')

  // populate certified coaches table in certified view
  if (document.location.href.match(/certified$/)) {

    $.getJSON("/api/coaches/certified").then(data => {
      console.log("List of coaches", data)
      let tbody = $('#certifiedList tbody')

      data.forEach((coach) => {
        tbody.append($(`<tr>
          <td>${coach.lastName}</td>
          <td>${coach.firstName}</td>
          <td>${coach.teamName}</td>
          <td>${coach.cprExpDate}</td>
          <td>${coach.faExpDate}</td>
          <td>${coach.ssExpDate}</td>
          <td>${coach.bgExpDate}</td>
          <td>${coach.usacMembership}</td>
          <td>${coach.isCertified}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary"><a href="/admin/${coach.id}/edit">Edit</a></button>
            </div>
          </td>
        </tr>`))
      })
    })
  }

  // populate pending coaches table in pending view
  if (document.location.href.match(/pending$/)) {

    $.getJSON("/api/coaches/pending").then(data => {
      console.log("List of coaches", data)
      let tbody = $('#pendingList tbody')

      data.forEach((coach) => {
        tbody.append($(`<tr>
          <td>${coach.lastName}</td>
          <td>${coach.firstName}</td>
          <td>${coach.teamName}</td>
          <td>${coach.cprExpDate}</td>
          <td>${coach.faExpDate}</td>
          <td>${coach.ssExpDate}</td>
          <td>${coach.bgExpDate}</td>
          <td>${coach.usacMembership}</td>
          <td>${coach.isCertified}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary"><a href="/admin/${coach.id}/edit">Edit</a></button>
            </div>
          </td>
        </tr>`))
      })
    })
  }

  // populate pending coaches table on home dashboard
  if (document.location.href.match(/home$/)) {

    $.getJSON("/api/coaches/home").then(data => {
      console.log("List of pending coaches", data)
      let tbody = $('#pendingList tbody')

      data.forEach((coach) => {
        tbody.append($(`<tr>
          <td>${coach.lastName}</td>
          <td>${coach.firstName}</td>
          <td>${coach.teamName}</td>
          <td>${coach.cprExpDate}</td>
          <td>${coach.faExpDate}</td>
          <td>${coach.ssExpDate}</td>
          <td>${coach.bgExpDate}</td>
          <td>${coach.usacMembership}</td>
          <td>${coach.isCertified}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary"><a href="/admin/${coach.id}/edit">Edit</a></button>
            </div>
          </td>
        </tr>`))
      })
    })
  }


  // get one coach
  let checkId = document.location.href.match(/(\d+)\/edit$/)

  if (checkId) {
    let id = checkId[1]
    console.log("found coach id", id);

    // grab the information from the token, saved during login
    // look up json web token javascript library
    // verify token and get payload...


    // grab information from the api with the id from token
    $.getJSON(`../../api/coaches/${id}`).then(data => {
      console.log('data from api: ', data);
      console.log('certified or not', data.isCertified);
      // set the form values to match the database info
      $('.admin-coach-header-first_name').html(data.firstName + "'s Coaching Profile")
      $('#admin-coach-dash-firstname').val(data.firstName)
      $('#admin-coach-dash-lastname').val(data.lastName)
      $('#admin-coach-dash-teamname').val(data.teamName)
      $('#admin-coach-dash-usacmem').val(data.usacMembership)
      $('#admin-coach-dash-bgExpDate').val(data.bgExpDate)
      $('#cprImage').attr('src', `${data.cprLink}`);
      $('#firstAidImage').attr('src', `${data.faLink}`);
      $('#safeSportImage').attr('src', `${data.ssLink}`);

      // change certifed status from true/false to words
      if (data.isCertified == true) {
        $('#admin-coach-dash-is_certified').html('<h4 style="color:green;">USAC CERTIFIED</h4>')
        $('#certification_status').html('<button type="button" class="btn" style="float:right">Uncertify</button>')
      } else {
        $('#admin-coach-dash-is_certified').html('<h4 style="color:red;">NOT CERTIFIED</h4>')
        $('#certification_status').html('<button type="button" class="btn" style="float:right">Certify</button>')
      }

      // date form fields, check to see if value is null
      // CPR date check and set value
      let cprDate = $('#admin-coach-dash-cprExpDate').val()
      if (cprDate != 'X') {
        $('#admin-coach-dash-cprExpDate').val(data.cprExpDate)
      }
      // first aid date check and set value
      let faDate = $('#admin-coach-dash-faExpDate').val()
      if (faDate != 'X') {
        $('#admin-coach-dash-faExpDate').val(data.faExpDate)
      }
      // first aid date check and set value
      let ssDate = $('#admin-coach-dash-ssExpDate').val()
      if (ssDate != 'X') {
        $('#admin-coach-dash-ssExpDate').val(data.ssExpDate)
      }

      //listen for click on certify/uncertify button

      // listen for click on update button
      $('#admin-coach-updateUser').click((e) => {
        e.preventDefault()
        console.log('button clicked');
        console.log($('#admin-coach-dash-firstname').val());

        // grab new values from fields
        let firstName = $('#admin-coach-dash-firstname').val()
        let lastName = $('#admin-coach-dash-lastname').val()
        let teamName = $('#admin-coach-dash-teamname').val()
        let usacMembership = $('#admin-coach-dash-usacmem').val()
        let bgExpDate = $('#admin-coach-dash-bgExpDate').val()
        let cprExpDate = $('#admin-coach-dash-cprExpDate').val()
        let faExpDate = $('#admin-coach-dash-faExpDate').val()
        let ssExpDate = $('#admin-coach-dash-ssExpDate').val()

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({
            firstName,
            lastName,
            teamName,
            usacMembership,
            bgExpDate,
            cprExpDate,
            faExpDate,
            ssExpDate
          }),
          dataType: 'json',
          type: 'PATCH',
          url: `../../api/coaches/${id}`
        }

        $.ajax(options)
          .done(res => {
            $('#hidden-pop').removeClass('hidden')
            $('#hidden-pop').on('animationend', () => {

              setTimeout(function() {
                $('#hidden-pop').addClass('hidden')
              }, 1100);

            })
            console.log('res from ajax call ', res);
          })
          .fail((err, res) => {
            window.location.href = '../../error'
          })
      })
    })
  }


  // populate current admin table in admin view
  if (document.location.href.match(/admins$/)) {

    $.getJSON("/api/admin/admins").then(data => {
      console.log("List of admins", data)
      let tbody = $('#currentAdmin tbody')

      data.forEach((admin) => {
        tbody.append(`<tr>
          <td>${admin.username}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary deleteBtn" data-id="${admin.id}">Delete</button>
            </div>
          </td>
        </tr>`)
      })
    })
  }

  // listen to delete button in admin table
  $('#currentAdmin tbody').on('click', '.deleteBtn', (e) => {
    console.log("you want to delete...", $(e.target).data('id'));
    let id = $(e.target).data('id')
    if (id) {
      $.ajax({
          url: `/api/admin/${id}`,
          type: "DELETE",
          dataType: 'json'
        })
        .done(data => {
          console.log("deleted", data)
        }).fail(window.location.href= '/admin/admins')
    }
  })

  //listen to add admin button
  $('#newAdminForm').submit((e) => {
    e.preventDefault()

    let data = $('#newAdminForm').serialize()

    console.log("this is the newAdmin data: ", data)
    $.post("/api/admin/", data, null, 'json').then((data) => {
      console.log("POSTED data", data);
      window.location.href = '/admin/admins'
    }).fail((err) => {
      console.error("THERE WAS AN ERROR WITH THE AJAX POST")
    })
  })

})
