var endError, fileServer, fs, listDirectory, ns, path, port, server;

fs = require('fs');

path = require('path');

ns = require('node-static');

port = 8080;

listDirectory = function(request, response) {
  var dir, html;

  dir = path.relative('/', request.url);
  html = "<!doctype html><meta charset=\"utf-8\">  <title>" + request.url + "</title><h1>" + request.url + "</h1><ul>";
  return fs.readdir(dir, function(err, result) {
    if (err) {
      return endError(request, response, {
        status: 500
      });
    }
    result.forEach(function(file) {
      html += "<li>";
      return html += "<a href=\"" + (encodeURI(request.url + '/' + file)) + "\">" + file + "</a>";
    });
    html += '</ul>';
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    return response.end(html);
  });
};

endError = function(request, response, err) {
  response.end("Error " + err.status);
  if (request.url !== '/favicon.ico') {
    return console.log("\u001b[31m Error - \u001b[m" + err.status + " occurred    for \u001b[1m" + request.url + "\u001b[m");
  }
};

fileServer = new ns.Server('.');

server = require('http').createServer(function(request, response) {
  return request.addListener('end', function() {
    return fileServer.serve(request, response, function(err) {
      if (err) {
        if (err.status === 404 && /^\/presentations/.test(request.url)) {
          return listDirectory(request, response);
        } else {
          return endError(request, response, err);
        }
      }
    });
  });
});

server.listen(port);

console.log("\u001b[36m Info  - \u001b[mPik7 server running at\u001b[1mlocalhost:" + port + "\u001b[m");
