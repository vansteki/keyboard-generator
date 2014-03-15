var express = require("express"),
	app = express(),
	http = require("http"),
	server = http.createServer(app),
	fs = require("fs"),
	__dirname = "www",
	io = require("socket.io").listen(server, {
		log: false
	}),
	port = 500

// decrease the percentage of bulb permanently
var per = 0
setInterval(function() {
	per -= 1
	if(per < 1)per = 0
}, 100)

var online_user = []

server.listen(port, function () {
	console.log("Server listen port "+port+"...")
})

app.use(express.static(__dirname))

io.sockets.on("connection", function (socket) {
	online_user.push(socket.id)
	//get user out of array when offline
	socket.on('disconnect', function () {
		for(var i=0;i<online_user.length;i++) {
			if(online_user[i] == socket.id)online_user.splice(i, 1)
		}
	})

	//how many user online
	socket.on("visitor", function (data) {
		socket.emit("visitor", { visitor: online_user.length })
	})

	//sync the percentage
	socket.on("sync_percent", function (data) {
		socket.emit("sync_percent", { per: per })
		var temp = 0
		if(Math.floor(per/10) > temp || Math.floor(per/10) < temp) {
			temp = Math.floor(per/10)
		}
	})

	//user generate power
	socket.on("incr_percent", function (data) {
		per += 3
		if(per > 100) {
			per = 100
			socket.emit("congraz", {})
		}
	})
})