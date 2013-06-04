
var express = require('express');
var app = express();

// public www for static files
var pub = __dirname + '/www';

// adjust views folder
var views = __dirname + '/dev/views';

// setup app
app.use(express.logger());
app.use(express.errorHandler());

// don't serve everything in www static (html needs to be generated dynamically)
app.use('/css',express.static(pub+'/css'));
app.use('/js',express.static(pub+'/js'));
app.use('/img',express.static(pub+'/img'));

app.set('views',views);
app.set('view engine', 'jade');
app.locals.pretty = true;

// homepage
app.get('/',function(req,res){
    "use strict";
    res.render('index');
});

app.listen(5000);
console.log('Listening on port 5000');