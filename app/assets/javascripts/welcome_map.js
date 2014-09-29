var welcomeMap = welcomeMap || {} ;

welcomeMap.initialize = function() {
  var mapCanvas = $('#map-canvas')[0];
  var map;
  var geocoder;

  initialize();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }

  function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
  }

  function errorFunction(){
    alert("Geocoding failed");
  }

  function initialize() {
    geocoder = new google.maps.Geocoder();
  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      
      if (status == google.maps.GeocoderStatus.OK) {        
        if (results[1]) {
          if ($('#googlemaps_autocomplete').length) {
            $('#googlemaps_autocomplete').val(results[0].formatted_address)
          }
        } else {
          $('#googlemaps_autocomplete').text("Automatic geolocation not found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  }

  // Drawing the map
  if (!!mapCanvas){
    if (navigator.geolocation) {
      // console.log(navigator.geolocation);
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
          setupMap(data);
        }
      });

      var mapOptions = {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(mapCanvas, mapOptions);

      // User location marker
      var user_marker = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map: map,
          icon: 'http://hydra-media.cursecdn.com/terraria.gamepedia.com/0/0b/Baby_Dinosaur.png?version=4b68c5e3222e9d1205383eaffa463d64'
        });

      google.maps.event.addListener(user_marker, 'click', function() {
        var user_popup = new google.maps.InfoWindow({
          content: "RAWR! You are here!"
        });
        user_popup.open(map, this);
      });
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
            content: "<strong>" + this.nickname + "</strong><br><medium> Address: " + this.location + "</medium><br><medium>Network: </medium><a href='networks/" + this.id + "''>" + this.ssid +"</a><br><medium>Password: " + this.password + "</medium>"
          });
          popup.open(map, this);
        });
      }
    }

    function errorCallback(error) {
      console.log(error);
    }
  }
  // Autocomplete address
  if ($('#googlemaps_autocomplete').length) { 
  var autocomplete = new google.maps.places.Autocomplete($('#googlemaps_autocomplete')[0]);
  }
}

google.maps.event.addDomListener(window, 'load', welcomeMap.initialize);