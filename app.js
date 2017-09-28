const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 8989

// 读取目录static下的文件
app.use('/static', express.static('dist/static'))

// 读取根目录下的index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

// 在线人数
var userCount = 0

// 在线用户列表
var userList = []

io.on('connection', (socket) => {
  console.log('find a person')
  socket.on('login', (data) => {
    socket.socketId = data
    userCount++
    userList.push(data)
    // 不是socket！是io！否则无法实时传递到每个客户端
    io.emit('transferCurrentData', {userList: userList, count: userCount})
  })

  socket.on('sendMessage', (data) => {
    console.log(data.text)
    console.log(data.name)
    io.emit('boardcastMessage', data)
  })
})



http.listen(port, () => {
  console.log('listening on *:' + port);
})