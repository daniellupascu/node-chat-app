var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconected from the server');
});

socket.on('newMessage', function(data) {
    // console.log(data);
    let li = $('<li></li>');
    li.text(`${data.from}:${data.text}`);
    $('#messages').append(li);
});

// socket.emit('createMessage', {
//         from: 'client',
//         text: 'message from client',
//     }, function(data) {
//         console.log('Got it', data);
// });

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});