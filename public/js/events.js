// axios.get(`http://eventful.com/json/events/search?app_key=87292345ygaf9iu2367&category=music&location=Asturias`)
//         .then(function (response) {
//           //console.log(response.request.socket._httpMessage.connection._events);
//           console.log(response);
          
//   })
const printConcert = (concert) => {
  console.log(concert);
  let div = $("<div>").addClass("concert-card")
  let h3 = $("<h3>").text(concert.title).attr("data-id", concert.id).addClass("concert");
  let loc = $("<p>").text(`${concert.venue_name} - ${concert.city_name}`);
  let date = $("<p>").text(concert.start_time);
  div.append(h3).append(loc).append(date);
  $("#search-results").append(div);
};

function show_events() {
  var oArgs = {
    app_key: "KLN35NSPZJRVNwD3",
    q: "music",
    where: document.getElementById("where").value,
    page_size: 6,
    date: "Future",
    sort_order: "popularity",
    keywords: "concert "+ document.getElementById("performer").value
  };

  EVDB.API.call("/events/search", oArgs, function(oData) {
    $("#search-results").html("");
    oData.events.event.forEach(event => {
      printConcert(event)
    });
  });
}
