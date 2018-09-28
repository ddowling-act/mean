var express = require('express');
var app = express();
http = require('http');
var insecureServer = http.createServer(app);

app.use('/', express.static('../dist/act-parking'));

insecureServer.listen(4400, function() {
  console.log('Insecure Server listening on port 4400');
});