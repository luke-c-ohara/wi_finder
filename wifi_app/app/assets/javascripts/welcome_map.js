var welcomeMap = welcomeMap || {} ;

welcomeMap.initialize = function() {
  var mapCanvas = $('#map-canvas')[0];
  var map;

  if (!!mapCanvas){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert('Your browser does not support geolocation.');
    }

    function successCallback(position) {
      $.ajax({
        url: '/networks',
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
          data.push({nickname: 'You are here!', location: 'Current location', latitude: position.coords.latitude, longitude: position.coords.longitude});
          setupMap(data);
        }
      });

      var mapOptions = {
        center: { lat:  position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(mapCanvas, mapOptions);
    }

    // Draw markers on map
    function setupMap(data) {
      for (var index_increment = 0; index_increment < data.length; index_increment++) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[index_increment].latitude, data[index_increment].longitude),
          map: map,
          location: data[index_increment].location,
          nickname: data[index_increment].nickname,
          ssid: data[index_increment].ssid,
          password: data[index_increment].password,
          id: data[index_increment].id
        });

        google.maps.event.addListener(marker, 'click', function() {
          var popup = new google.maps.InfoWindow({
            content: "<strong>" + this.nickname + "</strong><br><medium>Network: </medium><a href='networks/" + this.id + "''>" + this.ssid +"</a><br><medium> Address: " + this.location + "</medium><br><medium>Password: " + this.password + "</medium>"
          });
          popup.open(map, this);
        });
      }
    }

    function errorCallback(error) {
      console.log(error);
    }
  }
  // Autocomplete
  var autocomplete = new google.maps.places.Autocomplete($('#googlemaps_autocomplete')[0]);

  google.maps.event.addListener(googlemaps_autocomplete, 'place_changed', function(){
    var place = autocomplete.getPlace();
    });
}

google.maps.event.addDomListener(window, 'load', welcomeMap.initialize);