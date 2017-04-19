$(function() {
  $('#myModal').modal({
    show:true,
    backdrop:true
  })

  var Name = '';

  var socket = io();

  // 加入房间把昵称传入后端

  // 发送消息
  $('#form-chat').submit(function() {
    socket.emit('chatmessage', 'Name:' + $('#nametext').val());
    socket.emit('chatmessage', 'Text:' + $('#chattext').val());
    $('#chattext').val('');
    return false;
  });

  // 监听消息
  socket.on('chatmessage', function(message) {
    var message = '' +
      '<div>' +
      '  <span>' + message + '</span>' +
      '</div>';
    $('#message-list').append(message);
  });

  // 设置用户名
  $('#setName').on('click', function() {
    socket.emit('userList', $('#nametext').val());
    return false;
  });

  // 监听用户列表
  socket.on('userList', function(data) {
    $('#user-list').append('<li id=' + data + '>' + data + '</li>');
  });

  // 删除用户列表中的用户
  $('#exit').on('click', function() {
    socket.emit('dis', $('#nametext').val());
    return false;
    // var userid = $('#nametext').val();
    // $('#' + userid).remove();
    // var deletename = document.getElementById('user-list');
    // deletename.removeChild(deletename.children[0]);
  })
  
  socket.on('dis', function(data) {
    $('#' + data).remove();
  })
});