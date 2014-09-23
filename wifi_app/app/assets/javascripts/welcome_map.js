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
      var mapOptions = {
        center: { lat:  position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(mapCanvas, mapOptions);

      var markerOptions = {
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map
      }

      var marker = new google.maps.Marker(markerOptions);

      var infoWindowOptions = {
        content: 'You are here!'
      };

      var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

      infoWindow.open(map, marker);
      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.open(map, marker);
      });
    }

    function errorCallback(error) {
      console.log(error);
    }

    // var mapOptions = {
    //   center: { lat:  51.52, lng: -0.115 },
    //   zoom: 14,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // var map = new google.maps.Map(mapCanvas, mapOptions);
  }
}

google.maps.event.addDomListener(window, 'load', welcomeMap.initialize);