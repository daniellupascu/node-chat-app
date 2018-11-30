const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Disconected from the server');
    });

    socket.on('join', (data, callback) => {
        if(!isRealString(data.name) && !isRealString(data.room)) {
            callback('Name and room name are required');
        }

        socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));

        socket.broadcast.to(data.room).emit('newMessage', generateMessage('Admin', `${data.name} has joined`));

        socket.join(data.room);
    });

    socket.on('createLocationMessage', coords => {
        socket.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('createMessage', (data, callback) => {
        io.emit('newMessage', generateMessage(data.from, data.text));
        callback();
    }); 

});

let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});
 