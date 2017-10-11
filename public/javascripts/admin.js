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
        </tr>`))
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
        </tr>`)
      })
    })
  }

  $('#newAdminForm').submit((e) => {
    e.preventDefault()

    let data = $('#newAdminForm').serialize()

    console.log("this is the newAdmin data: ", data)
    $.post("/api/admin", data, null, 'json').then((data) => {
      console.log("POSTED data", data);
      document.location = '/admins';
    }).fail((err) => {
      console.error("THERE WAS AN ERROR WITH THE AJAX POST")
    })
  })

})
