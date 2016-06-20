var express = require('express'),
  app = express(),
  http = require('http').createServer(app)

app.use(express.static(__dirname + '/www'))

http.listen(8000)

var online_user = [],
  per = 0

// decrease the percentage of bulb permanently
setInterval(function() {
  per = per < 1 ? 0 : per - 1
}, 100)

var io = require('socket.io').listen(http, {
    log: false
})

io.sockets.on('connection', function (socket) {
  online_user.push(socket.id)
  //get user out of array when offline
  socket.on('disconnect', function () {
    for(var i=0;i<online_user.length;i++) {
      if(online_user[i] == socket.id)online_user.splice(i, 1)
    }
  })

  //how many user online
  socket.on('sync_visitor', function (data) {
    socket.emit('sync_visitor', { visitor: online_user.length })
  })

  //sync the percentage
  socket.on('sync_percent', function (data) {
    socket.emit('sync_percent', { per: per })
    var temp = 0
    if(Math.floor(per/10) > temp || Math.floor(per/10) < temp) {
      temp = Math.floor(per/10)
    }
  })

  //user generate power
  socket.on('incr_percent', function (data) {
    console.log(per)
    per += 3
    if(per > 100) {
      per = 100
      socket.emit('congraz', {})
    }
  })
})
