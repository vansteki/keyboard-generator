import server, {
  addPer,
  getPer,
  addUser,
  removeUser,
  getUsers
} from 'server';
import http from 'server.http';
import socketIO from 'socket.io';

const io = socketIO.listen(http, { log: false });

io.on('connection', socket => {

  addUser(socket.id);

  const sync = setInterval(() => {
    socket.emit('sync_visitor', { visitor: getUsers().length });
    socket.emit('sync_percent', { per: getPer() })
  }, 100);

  socket.on('disconnect', () => {
    removeUser(socket.id);
    clearInterval(sync);
  });

  //user generate power
  socket.on('incr_percent', data => addPer(3))
});
