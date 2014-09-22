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
      console.log(position);

      var latlong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      console.log(latlong);

      var mapOptions = {
        center: { lat:  position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(mapCanvas, mapOptions);
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