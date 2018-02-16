const printConcert = (concert) => {
  let mainDiv = $("<div>").addClass("col-sm-6 col-md-4 concert-card")
  let subDiv = $("<div>").addClass("card")
  let div = $("<div>").addClass("card-block")
  let h5 = $("<h5>").attr("data-id", concert.id).addClass("card-title concert");
  let a = $("<a>").text(concert.title).attr("href",`/concerts/${concert.id}`)
  h5.append(a)
  let loc = $("<p>").text(`${concert.venue_name} - ${concert.city_name}`);
  let date = $("<p>").text(concert.start_time);
  let btn = $("<a>").attr("href",`/concerts/${concert.id}`).addClass("btn btn-primary").text("View")
  div.append(h5).append(loc).append(date).append(btn);
  subDiv.append(div);
  mainDiv.append(subDiv)
  $("#search-results").append(mainDiv);
};
const printError = (message) => {
  let error = $("<div>").addClass("alert alert-danger").html(message)
  $("#search-results").append(error)
}

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
    if (!oData.events) {
      printError("There are no concerts in your area yet :(")
    } else{
      oData.events.event.forEach(event => {
        printConcert(event)
      });
    }
  });
}
