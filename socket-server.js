'use strict'

// set for the socket server to open the socket for chat message so it can send messages over the socket.
var socketIO = require('socket.io');
module.exports = function(server) {
  var io = socketIO(server);
  io.on('connection', function(socket) {
    socket.on('joinRoom', function(data){
      socket.room = data.room;
      // data.room will create a socket based on a room, anyone inside that socket can send a message among those.
      socket.join(data.room);
    })
    // this function open socket named 'chatMessage' and pass data into the socket.
    socket.on('chatMessage', function(data) {
      io.to(socket.room).emit('chatMessage', data);
    });
    //once you leave the room, it disconnect.
    socket.on('disconnect', function() {
      socket.leave(socket.room);
    });
  })
}
