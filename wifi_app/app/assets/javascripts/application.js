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
//= require welcome_map.js
//= require_tree .

$(function() {
  $('form').on('submit', function(ev){
    ev.preventDefault();
    // alert("a search has been made.");
    console.log('searched')
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { q: $('#user_search').val() },
      dataType: 'JSON',
      success: function(data) {
        data.forEach(displayEmails);
      }
    });
  });
});

function displayEmails(object) {
  $("#search_users").append("<p>" + object.email + " </p>");


  $("#search_users").append('<input type="checkbox" id="' + object.id + 'VisibleCheckbox" name="'  + object.email + 'VisibleCheckbox" >');

}




