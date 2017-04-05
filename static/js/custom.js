$(function() {
  var vmUserList = new Vue({
    el: '#user-list',
    data: {
      users: []
    }
  });

  //设置ID
  var userName = '';
  while ($('#userName').text().trim() === '') {
    userName = prompt("请设置你的ID", "");
    $('#userName').append(userName);
  }

  var socket = io();

  // 加入房间
  socket.on('connect', function() {
    socket.emit('join', userName);
  });

  $('form').submit(function() {
    socket.emit('chatmessage', $('#chattext').val());
    $('#chattext').val('');
    return false;
  });

  // 监听消息
  socket.on('chatmessage', function(msg) {
    var message = '' +
      '<div>' +
      '  <span>' + userName + ': </span>' +
      '  <span>' + msg + '</span>' +
      '</div>';
    $('#message-list').append(message);
  })
});