'use strict';

var socket = io.connect('http://10.1.30.222:3010/');

var user = (function() {
  function getName() { return localStorage.getItem('nickname'); }
  function setName(name) { return localStorage.setItem('nickname', name); }

  function getColor() { return localStorage.getItem('color'); }
  function setColor(color) { return localStorage.setItem('color', color); }
  return {
    getName: getName, setName: setName,
    getColor: getColor, setColor: setColor,
  };
})();

$(function() {
  var $input       = $('.chat-input');
  var $messages    = $('.chat-messages');
  var $members     = $('.chat-members');
  var $currentName = $('.chat-current-name');
  var $topicEdit   = $('.chat-topic-edit');
  var $topicInput  = $('.chat-topic-input');
  var $topic       = $('.chat-topic');


  $('.chat-color.ui.dropdown').dropdown();

  $('.chat-color').on('click', '.item', function() {
    var classNames = $(this).find('.empty.label').attr('class').split(' ');
    classNames = classNames.filter(function(item) {
      return ['ui', 'empty', 'circular', 'label'].indexOf(item) === -1;
    })[0];

    user.setColor(classNames);
    socket.emit('change:color', {color: classNames});
  });

  var toggle = function() {
    $topic.toggle();
    $topicInput.toggle();
  };

  $topicEdit.on('click', toggle);
  $topicInput.on('keyup', 'input', function(event) {
    var text = $(this).val();

    if(event.keyCode === 13 && text) {
      $(this).val('');
      socket.emit('change:topic', {name: text});
      toggle();
    }
  });

  $input.on('keyup', function(event) {
    var message = $input.val();

    if(event.keyCode === 13 && message) {
      socket.emit('send:message', {message: message});
      $input.val('');
    }
  });

  $currentName.on('keyup', function(event) {
    var name = $currentName.val();

    if(event.keyCode === 13 && name) {
      socket.emit('change:name', {name: name});
      user.setName(name);
    }
  });


  socket.on('change:topic', function(data) {
    $topic.find('.topic-text').html(data.name);
    $topicInput.find('input').val(data.name);
  });


  socket.on('change:color', function(data) {
    $messages.find('[data-name="'+data.name+'"]').each(function(i, message) {
      $(message).removeClass().addClass('ui horizontal label ' + data.color);
    });
  });


  socket.on('send:message', function(data) {
    var $msg = $('<div>', {class: 'ui horizontal label ' + data.color, text: data.name}).attr('data-name', data.name);
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
    var $item = $('<div>', {text: data.name, class: 'item'}).attr('data-name', data.name);
    $members.append($item);
  });


  socket.on('user:left', function(data) {
    var $item = $members.find('[data-name="'+data.name+'"]');
    $item.remove();
  });


  socket.on('connect', function() {
    socket.emit('join', {name: user.getName(), color: user.getColor()});
  });

});
