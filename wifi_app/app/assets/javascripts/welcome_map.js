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
          data.push({location: 'You are here!', latitude: position.coords.latitude, longitude: position.coords.longitude});
          setupMap(data);
        }
      });

      var mapOptions = {
        center: { lat:  position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(mapCanvas, mapOptions);

      // var infoWindow = new google.maps.InfoWindow();
    }

    function setupMap(data) {

      console.log(data)

      for (var index_increment = 0; index_increment < data.length; index_increment++) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[index_increment].latitude, data[index_increment].longitude),
          map: map,
          location: data[index_increment].location 
        });

        google.maps.event.addListener(marker, 'click', function() {
          var popup = new google.maps.InfoWindow();
          popup.setContent(marker.location);
          popup.open(map, marker);
        });

        // google.maps.event.addListener(marker, 'click', (function(marker, index_increment) {
        //   return function() {
        //     infoWindow.setContent(data[index_increment].location);
        //     infoWindow.open(map, marker);
        //   }
        // }) (marker, index_increment));
      }
    }

    function errorCallback(error) {
      console.log(error);
    }

    // OLD GEOLOCATOR WORKING
    // function successCallback(position) {
    //   var mapOptions = {
    //     center: { lat:  position.coords.latitude, lng: position.coords.longitude },
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };

    //   var map = new google.maps.Map(mapCanvas, mapOptions);

    //   var markerOptions = {
    //     position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    //     map: map
    //   }

    //   var marker = new google.maps.Marker(markerOptions);

    //   var infoWindowOptions = {
    //     content: 'You are here!'
    //   };

    //   var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    //   infoWindow.open(map, marker);
    //   google.maps.event.addListener(marker, 'click', function(){
    //     infoWindow.open(map, marker);
    //   });
    // }

    // function errorCallback(error) {
    //   console.log(error);
    // }
  }
}

google.maps.event.addDomListener(window, 'load', welcomeMap.initialize);