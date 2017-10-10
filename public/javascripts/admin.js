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


})
