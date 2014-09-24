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
          var tags = [];
          for (var i = 0; i < data.length; i++) {
          tags.push(data[i].email);
          
        }
          $( "#user_search" ).autocomplete({
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