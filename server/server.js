const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Disconected from the server');
    });
});


let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});
 