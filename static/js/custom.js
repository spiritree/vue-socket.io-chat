$(function() {
  $('#myModal').modal({
    show:true,
    backdrop:true
  })

  var vmUserList = new Vue({
    el: '#user-list',
    data: {
      users: []
    }
  });

// // 监听输入昵称
//   var model = new Vue({
//     el: '#getName',
//     data: {
//       name: ''
//     }
//   })

  window.vmUserList = vmUserList;

  // 设置用户名称
  // var Name = '';
  // for (var i=0; i<1; i++) {
  //   Name = prompt("请设置你的昵称","");
  // }

  var socket = io();

  // // 加入房间把昵称传入后端
  // socket.on('connect', function() {
  //   socket.emit('join', Name);
  // });

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

  // socket.emit('userlist', '<li>' + $('#nametext').val() + '</li>');

  // socket.on('userlist', function(data) {
  //   var data = '<li>' + $('#nametext').val() + '</li>';
  //   $('#user-list').html(data);
  // });
  // $('#setName').on("click", function() {
  //   $('#user-list').html('<li>' + $('#nametext').val() + '</li>');
  // });

  $('#setName').on("click", function() {
    socket.emit('userList', '<li>' + $('#nametext').val() + '</li>');
    return false;
  });

  socket.on('userList', function(data) {
    $('#user-list').append(data);
  });
});