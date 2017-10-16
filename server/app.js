import express from 'express'
import socketio from 'socket.io'
import path from 'path'
import http from 'http'

const app = express()
const httpPort = http.Server(app)
const io = socketio(httpPort)
const port = process.env.PORT || 8989

// 读取目录static下的文件
app.use('/static', express.static('dist/static'))

// 读取根目录下的index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
  // res.sendFile(__dirname + '../dist/index.html')
})

// 在线人数
let userCount = 0

// 在线用户列表
let userList = []

// 在线用户信息
let userInfoList = []

io.on('connection', (socket) => {
  console.log('find a person')
  socket.on('login', (data) => {
    userCount++
    userList.push(data)
    let userInfo = { id: socket.id, name: data }
    userInfoList.push(userInfo)
    // 不是socket！是io！否则无法实时传递到每个客户端
    io.emit('onlineMessage', { name: data })
    io.emit('transferUserState', { userList: userList, count: userCount })
  })

  socket.on('sendMessage', (data) => {
    io.emit('boardcastMessage', data)
  })

  socket.on('disconnect', (data) => {
    console.log('a person disconnected')
    for (let userInfo of userInfoList) {
      if (userInfo.id === socket.id) {
        const findDisconnectName = (value) => {
          return value === userInfo.name
        }
        const deleteName = userList.find(findDisconnectName)
        const deleteIndex = userList.findIndex((value) => {
          return value === deleteName
        })
        userCount--
        userList.splice(deleteIndex, 1)
        io.emit('disconnectMessage', { deleteName: deleteName })
        io.emit('updateUserState', { count: userCount, userList: userList })
      }
    }
  })
})

httpPort.listen(port, () => {
  console.log('listening on *:' + port)
})
