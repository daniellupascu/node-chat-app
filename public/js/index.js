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

socket.on('newLocationMessage', function(data){
    let li = $('<li></li>');
    let a = $('<a target="_blank">my corrent location</a>');
    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    let messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

let locationButton = $('#send-location');
locationButton.on('click', function(e){

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude:position.coords.longitude
            });
        }, function(){
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to get location');
        });
      } else {
        /* geolocation IS NOT available */
        return alert('Geolocation not suported by your browser');
      }
});