const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
        from: 'dani@gmail.com',
        text: "Hey, whats up",
        createdAt: 123
    });

    socket.on('createEmail', (newEmail) =>{
        console.log('createEmail',newEmail);
    })

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
});

server.listen(port, function() {
    console.log(`Server is up on ${port}`);
});

