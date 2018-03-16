var http = require("http");
var fs = require("fs"); //import Node.js file system module
//var path = require("path"); //finds file that was requested
var extract = require("./extract"); //uses extract.js
var wss = require("./websockets-server");
var handleError = function(err, res) {
  res.writeHead(404);
  res.end();
};

//function is called for every HTTP request
var server = http.createServer(function(req,res){
  console.log("Responding to a request.");
  //res.end("<h1>Hello, World!!</h1>");
  //callback checks what file the browser is requesting
  //var url = req.url;
  //var fileName = "index.html";
  //if(url.length > 1) {
  //  fileName = url.substring(1); //if not index.html, it gets rid of the first character '/'
  //}
  //console.log(fileName);
  //var filePath = path.resolve(__dirname, "app", fileName);
  //readFile method takes in a filename and a callback
  //inside the callback, the contents of file are sent
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data){
    if(err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});

server.listen(3000); //binds to a port
