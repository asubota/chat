var socket = io.connect('http://localhost:3010');

socket.on('messages', function(data) {
  console.log(data);
});

socket.emit('join', 'name');
socket.emit('messages', 'atata');
