const printConcert = (concert) => {
  let div = $("<div>")
  let h4 = $("<h4>").text(concert.title).attr("data-id", concert.id).addClass("concert");
  let loc = $("<p>").text(concert.venue_name);
  div.append(h4).append(loc);
  $("#search-results").append(div);
};

function show_events() {
  var oArgs = {
    app_key: "KLN35NSPZJRVNwD3",
    q: "music",
    where: document.getElementById("where").value,
    page_size: 6,
    sort_order: "popularity",
    keywords: document.getElementById("performer").value
  };

  EVDB.API.call("/events/search", oArgs, function(oData) {
    $("#search-results").html("");
    oData.events.event.forEach(event => {
      printConcert(event)
    });
  });
}
