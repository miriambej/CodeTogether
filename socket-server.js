'use strict'

// set for the socket server to open the socket for chat message so it can send messages over the socket.
var socketIO = require('socket.io');
var ot = require('ot');
var roomList = {};

module.exports = function(server) {
  // created a string that is going to be by default in the code editor.
  var str = 'This is a Markdown heading \n\n' +
  'var i = i + 1;'
  var io = socketIO(server);
  io.on('connection', function(socket) {
    socket.on('joinRoom', function(data){
      //its going to pass the data.room which is the id to the empty roomList array.
      if (!roomList[data.room]) {
        // if everything is good, run.
        var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb) {
          var self = this;
          Task.findByIdAndUpdate(data.room, {content: self.document}, function(err) {
            if (err) return cb(false);
            cb(true);
          });

        });
        roomList[data.room] = socketIOServer;
      }
      //once it has the id of the specific task, it adds to the socket and then setName along with the username.
      roomList[data.room].addClient(socket);
      roomList[data.room].setName(socket, data.username);
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
