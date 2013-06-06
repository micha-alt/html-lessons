
var express = require('express');
var app = express();

// public www for static files
var pub = __dirname + '/www';

// just the static handler
app.use('/',express.static(pub));

app.listen(8080);
console.log('Listening on port 8080');