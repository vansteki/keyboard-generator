import {
  hostname,
  maintaining,
  syncVisitor,
  syncBulb,
  displayResult
} from "utils/share";

import io from 'socket.io-client';

const socket = io.connect("http://" + hostname, {
  "force new connection": true
});

export default socket;

socket.on("connect", () => {
  console.log("Connected to server!")
  setInterval(() => {
    socket.emit("sync_visitor")
    socket.emit("sync_percent")
  }, 100)
})

socket.on("disconnect", () => {
  console.log("Lost connection!")
  maintaining()
})

socket.on("sync_visitor", data => {
  syncVisitor(data.visitor)
})

socket.on("sync_percent", data => {
  syncBulb(data.per)
})

socket.on("congraz", () => {
  displayResult()
})
