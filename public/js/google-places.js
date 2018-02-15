$(window).keypress(function(event) {
  if (event.keyCode == '13') {
     event.preventDefault();
     return false;
   }
});

function initMap() {
  console.log(concertData)
  var concert = { lat: parseFloat(concertData.latitude), lng: parseFloat(concertData.longitude) };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: concert
  });
  var marker = new google.maps.Marker({
    position: concert,
    map: map
  });

  console.log("READY");
  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('pac-input'));
  var types = document.getElementById('type-selector');
  //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  autocomplete.addListener("place_changed", function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(15); 
    }
    marker.setIcon(
      /** @type {google.maps.Icon} */ ({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      })
    );
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          ""
      ].join(" ");
    }
    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    );
    infowindow.open(map, marker);
    
  });

  var service = new google.maps.places.PlacesService(map);
  
  const getInfowindowData = () =>{
    setTimeout(function() {
      console.log($(".poi-info-window").html())
    }, 1000);
  }

  $("#map").on("click", getInfowindowData);

};