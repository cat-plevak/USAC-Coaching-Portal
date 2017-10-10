$(document).ready(() => {
  console.log('document ready!')

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

  if (document.location.href.match(/add_admin$/)) {

    $.getJSON("/api/admin/").then(data => {
      console.log("List of admin", data)
    })
  }


})
