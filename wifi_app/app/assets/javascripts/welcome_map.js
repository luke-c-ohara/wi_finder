var welcomeMap = welcomeMap || {} ;

welcomeMap.initialize = function() {
  var mapCanvas = $('#map-canvas')[0];
  if (!!mapCanvas){
    var mapOptions = {
      center: { lat:  51.52, lng: -0.115 },
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);
  }
}

google.maps.event.addDomListener(window, 'load', welcomeMap.initialize);