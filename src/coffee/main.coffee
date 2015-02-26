# 'use strict'

# socket = io.connect 'http://10.1.30.222:3010/'

# userName = do () ->
#   get = ->
#     localStorage.getItem 'nickname'
#   set = (name) ->
#     localStorage.setItem 'nickname', name
#   get: get, set: set


# $ ->
#   $input       = $ '.chat-input'
#   $messages    = $ '.chat-messages'
#   $members     = $ '.chat-members'
#   $currentName = $ '.chat-currentName'

#   $input.on 'keyup', (event) ->
#     message = $(@).val()

#     if event.keyCode == 13 and message
#       $input.val ''
#       socket.emit 'send:message', message: message

#   $currentName.on 'keyup', (event) ->
#     name = $(@).val()

#     if event.keyCode == 13 and name
#       userName.set name
#       socket.emit 'change:name', name: name

#   socket.on 'send:message', (data) ->
#     $msg = $('<div>', class: 'ui green horizontal label', text: data.name).attr 'data-name', data.name
#     $item = $('<div>', class: 'item').append($msg).append data.message

#     $messages.append $item

#   socket.on 'user:init', (data) ->
#     $currentName.val data.name

#   socket.on 'change:name', (data) ->
#     $item = $members.find '[data-name="'+data.oldName+'"]'
#     messages = $messages.find '[data-name="'+data.oldName+'"]'

#     $item.html(data.name).attr 'data-name', data.name

#     messages.each (i, message) ->
#       $(message).html(data.name).attr 'data-name', data.name

#   socket.on 'user:join', (data) ->
#     $item = $('<div>', text: data.name, class: 'item').attr 'data-name', data.name
#     $members.append $item

#   socket.on 'user:left', (data) ->
#     $item = $members.find '[data-name="'+data.name+'"]'
#     $item.remove()

#   socket.on 'connect', () ->
#     socket.emit 'join', name: userName.get()
