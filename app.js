var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var redis   = require('redis').createClient();
var port    = 3010;

app.use(express.static(__dirname + '/public'));

var getName = function() {
  return ['User', Math.floor((Math.random() * 100) + 1)].join('-');
};

// redis.flushdb();

io.on('connection', function(client) {


  client.on('join', function(data) {
    client.nickname = data.name || getName();

    client.emit('user:init', {name: client.nickname});
    client.broadcast.emit('user:join', {name: client.nickname});

    redis.smembers('members', function(error, members) {
      members.forEach(function(name) {
        client.emit('user:join', {name: name});
      });
    });

    redis.sadd('members', client.nickname);

    redis.lrange('messages', 0, -1, function(error, messages) {
      messages = messages.reverse();
      messages.forEach(function(message) {
        message = JSON.parse(message);
        client.emit('send:message', {name: message.name, message: message.message});
      });
    });
  });


  client.on('disconnect', function() {
    client.broadcast.emit('user:left', {name: client.nickname});
    redis.srem('members', client.nickname);
  });


  client.on('change:name', function(data) {
    redis.sismember('members', data.name, function(error, isTaken) {
      if (isTaken) {

      } else {
        client.emit('change:name', {name: data.name, oldName: client.nickname});
        client.broadcast.emit('change:name', {name: data.name, oldName: client.nickname});

        redis.srem('members', client.nickname);
        client.nickname = data.name;
        redis.sadd('members', client.nickname);
      }
    });

  });


  client.on('send:message', function(data) {
    var message = {name: client.nickname, message: data.message};

    redis.lpush('messages', JSON.stringify(message), function() {
      redis.ltrim('messages', 0, 9);
    });

    client.emit('send:message', message);
    client.broadcast.emit('send:message', message);
  });


});

http.listen(port, function() {
  console.log('listening on *:'+port);
});
