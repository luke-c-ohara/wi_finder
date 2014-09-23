var welcomeMap = welcomeMap || {} ;

welcomeMap.initialize = function() {
  var mapCanvas = $('#map-canvas')[0];
  if (!!mapCanvas){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert('Your browser does not support geolocation.');
    }

    function successCallback(position) {
      var locations = [['You are here!', position.coords.latitude, position.coords.longitude], ['20 Eyre Street Hill', 51.5225220, -0.1103600]];

      var mapOptions = {
        center: { lat:  position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(mapCanvas, mapOptions);

      var infoWindow = new google.maps.InfoWindow();

      var marker, index_increment;

      for (index_increment = 0; index_increment < locations.length; index_increment++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[index_increment][1], locations[index_increment][2]),
          map: map
        });

        // google.maps.event.addListener(marker, 'click', function() {
        //   infoWindow.setContent(locations[index_increment][0]);
        //   infoWindow.open(map, marker);
        // });

        // google.maps.addListener(marker, 'click', (function(marker, index_increment) {
        //   return function() {
        //     infoWindow.setContent(locations[index_increment][0]);
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