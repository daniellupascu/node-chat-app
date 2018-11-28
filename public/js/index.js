var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');

    // socket.emit('createMessage', {
    //     from: 'client',
    //     text: 'message from client',
    // })

});

socket.on('disconnect', function() {
    console.log('Disconected from the server');
});

socket.on('newMessage', function(data) {
    console.log(data);
})