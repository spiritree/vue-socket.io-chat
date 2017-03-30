$(function() {
  var vmMessageList = new Vue({
    el: '#message-list',
    data: {
      messages: [a]
    }
  });

  var vmUserList = new Vue({
    el: '#user-list',
    data: {
      users: []
    }
  });

  var socket = io();
  $('form').submit(function() {
    socket.emit('chat message', $('#chattext').val());
    $('#chattext').val('');
    return false;
  });
});