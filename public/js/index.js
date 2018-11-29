var socket = io();

function scrollToBottom(){
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        console.log('should scroll');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconected from the server');
});

socket.on('newMessage', function(data) {

    let formattedTime = moment(data.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: data.text,
        time: formattedTime,
        from: data.from
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(data){
    let formattedTime = moment(data.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        url: data.url,
        time: formattedTime,
        from: data.from
    });
    $('#messages').append(html);
    scrollToBottom();
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