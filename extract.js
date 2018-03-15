var path = require("path");

var extractFilePath = function(url) {
  var filePath;
  var fileName = "index.html";

  if(url.length > 1) {
    fileName = url.substring(1);
  }
  console.log("The filename is: " + fileName);

  filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};

//allows other modules to import it with require (global)
module.exports = extractFilePath;
