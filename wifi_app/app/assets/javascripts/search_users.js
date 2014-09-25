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
        $("#user_search").val('');
        data.forEach(displayEmails);
      }
    });
  });


 $( document ).ready(function(ev) {
   // ev.preventDefault();
    $.ajax({
      url: '/users',
      type: 'GET',
      dataType: 'JSON',
      data: { q: $('#user_search').val() },
      success: function(data) {
        var tags = [];
        for (var i = 0; i < data.length; i++) {
          tags.push({value: data[i].email, id: data[i].id});
        }
        $( "#user_search" ).autocomplete({
          source: tags, 
          select: function(a,b) {
            a.preventDefault();
          displayEmails(b.item);
          }
        });
      }
    });
  }); 
});

function displayEmails(object) {
  $("#search_users").append('<label for="friend_ids_'+object.id+'">' + object.value + '</label>');
  $("#search_users").append('<input id="friend_ids_' + object.id + '" name="friend_ids[]" type="checkbox" value="'+object.id+'" checked="checked"><br>');

}