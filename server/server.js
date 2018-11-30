const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users')

const app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Disconected from the server');
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });

    socket.on('join', (data, callback) => {
        if(!isRealString(data.name) && !isRealString(data.room)) {
            return callback('Name and room name are required');
        }

        socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
        socket.broadcast.to(data.room).emit('newMessage', generateMessage('Admin', `${data.name} has joined`));
        socket.join(data.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, data.name, data.room); 
        io.to(data.room).emit('updateUserList', users.getUserList(data.room));
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
 