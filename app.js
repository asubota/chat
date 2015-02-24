var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var port    = 3010;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(client) {
  client.emit('messages', {hello: 'hello'});

  client.on('messages', function(data) {
    var nickname = client.nickname;
    client.broadcast.emit('messages', nickname + ': ' + data);
  });

  client.on('join', function(name) {
    console.log(name + ' connected !');
    client.nickname = name;
  });
});

http.listen(port, function() {
  console.log('listening on *:'+port);
});
