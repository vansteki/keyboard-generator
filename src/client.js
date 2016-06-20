import socket from 'client.socket';

$("#bulb").click(() => {
  socket.emit("incr_percent")
})

let hold = false
$(window).keyup(e => {
  switch(e.which) {
    case 37:
      hold = true;
      break;
    case 39:
      hold && socket.emit("incr_percent");
      hold = false;
      break;
  }
})
