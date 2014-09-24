// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui.js
//= require welcome_map.js
//= require_tree .

$(function() {

  $('#search-users').on('click', function(ev){
    ev.preventDefault();
    console.log('searched')
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { q: $('#user_search').val() },
      dataType: 'JSON',
      success: function(data) {
        $("#search_users").empty()
        data.forEach(displayEmails);
      }
    });
  });

  

  $( document ).ready(function() {
      console.log( "ready!" );
      $.ajax({
        url: '/users',
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
          console.log(data);
          var tags = [];
          for (var i = 0; i < data.length; i++) {
          tags.push(data[i].email);
          
          }
          // var tags = data.map(returnEmail);
          console.log(tags);
          $( "#tags" ).autocomplete({
                source: tags
              });
        }
      });
  }); 
});

function displayEmails(object) {
  $("#search_users").append('<label for="friend_ids_'+object.id+'">' + object.email + '</label>');
  $("#search_users").append('<input id="friend_ids_" name="friend_ids[]" type="checkbox" value="'+object.id+'">');

}

function returnEmail(object) {
  object.email
}



