'use strict'

// set for the socket server to open the socket for chat message so it can send messages over the socket. 
var socketIO = require('socket.io');
module.exports = function(server) {
  var io = socketIO(server);
  io.on('connection', function(socket) {
    // this function open socket named 'chatMessage' and pass data into the socket
    socket.on('chatMessage', function(data) {
      io.emit('chatMessage', data);
    })
  })
}
