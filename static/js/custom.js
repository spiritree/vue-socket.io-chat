$(function() {
  var vmUserList = new Vue({
    el: '#user-list',
    data: {
      users: [
      ]
    }
  });

// 监听输入昵称
  var model = new Vue({
    el: '#getName',
    data: {
      name: ''
    }
  })

  window.vmUserList = vmUserList;
  window.model = model;

  var socket = io();

  // 加入房间
    socket.on('connect', function() {
      socket.emit('join', model.name);
    });

  // 发送消息
  $('form').submit(function() {
    socket.emit('chatmessage', 'Name:' + model.name);
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
  })

  socket.on('updateUser', function(data) {
    vmUserList.users.push({username: model.name});
    })
  });