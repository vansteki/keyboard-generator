import _ from 'lodash';
import http from 'server.http';
import socket from 'server.socket';

http.listen(process.env.PORT || 8000);

let per = 0;
let users = [];

setInterval(() => {
  per = per - 1 < 0 ? 0 : per - 1;
}, 100); // minus 1 every 0.1s

export const addPer = amt => {
  if (per + amt > 100) {
    per = 100;
    socket.emit('congraz')
  }
  else per += amt;
};

export const getPer = () => per;

export const addUser = id => {
  users.push(id);
};

export const removeUser = id => {
  users = _.pull(users, id);
};

export const getUsers = () => users;
