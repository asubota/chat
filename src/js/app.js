var socket = io.connect('http://10.1.30.222:3010/');

var userName = (function() {
  function get() { return localStorage.getItem('nickname'); }
  function set(name) { return localStorage.setItem('nickname', name); }
  return {
    get: get, set: set
  };
})();

$(function() {
  var $input       = $('.chat-input');
  var $messages    = $('.chat-messages');
  var $members     = $('.chat-members');
  var $currentName = $('.chat-currentName');

  $input.on('keyup', function(event) {
    var message = $input.val();

    if(event.keyCode == 13 && message) {
      socket.emit('send:message', {message: message});
      $input.val('');
    }
  });

  $currentName.on('keyup', function(event) {
    var name = $currentName.val();

    if(event.keyCode == 13 && name) {
      socket.emit('change:name', {name: name});
      userName.set(name);
    }
  });

  socket.on('send:message', function(data) {
    var $msg = $('<div>', {class: 'ui green horizontal label', text: data.name}).attr('data-name', data.name);
    var $item = $('<div>', {class: 'item'}).append($msg).append(data.message);

    $messages.append($item);
  });


  socket.on('user:init', function(data) {
    $currentName.val(data.name);
  });


  socket.on('change:name', function(data) {
    var $item = $members.find('[data-name="'+data.oldName+'"]');
    var messages = $messages.find('[data-name="'+data.oldName+'"]');

    $item.html(data.name).attr('data-name', data.name);
    messages.each(function(i, message) {
      $(message).html(data.name).attr('data-name', data.name);
    });
  });


  socket.on('user:join', function(data) {
    var $item = $('<div>', {text: data.name, class: 'item',}).attr('data-name', data.name);
    $members.append($item);
  });


  socket.on('user:left', function(data) {
    var $item = $members.find('[data-name="'+data.name+'"]');
    $item.remove();
  });


  socket.on('connect', function() {
    socket.emit('join', {name: userName.get()});
  });

});
