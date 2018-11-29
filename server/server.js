const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('New user connected');

     socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));

     socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    socket.on('disconnect', () => {
        console.log('Disconected from the server');
    });

    socket.on('createLocationMessage', coords => {
        socket.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('createMessage', (data, callback) => {
        console.log(data);

        io.emit('newMessage', generateMessage(data.from, data.text));

        callback('this is from the server');
    }); 

});

let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});
 