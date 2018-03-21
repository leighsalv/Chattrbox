var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];
var topic;

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  /*Create a new chat topic when user types "/topic"*/
  if (topic) {
    var currentTopic = "*** Topic is ";
    currentTopic += "'" + topic + "'";
    socket.send(currentTopic);
  }
  messages.forEach(function(msg) { //sends previous messages
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("message received: " + data);

    if (data.indexOf("/topic") != -1) {
      var changedTopic = "*** Topic has been changed to ";
      changedTopic += "'" + data.substring(7, data.length) + "'";
      topic = data.substring(7, data.length);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(changedTopic);
      });

    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) { //send new msgs to all users
        clientSocket.send(data);
      });
    }
  });
});
