const express           = require('express')
const app               = express()
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
var userssocket = {};
//socket functions (ou emits, o que preferir)
io.on('connection', function(socket){
    socket.on('join', function(data){
        userssocket[data._id] = socket;
    });
    socket.on('joinG', function(data){
        console.log(data);
        socket.join(data.to);
        io.to(data.to).emit('receiveMessage', data);
    });
    socket.on('disconnect', function(){
    });
    socket.on('sendMessageF', function(data){
        userssocket[data.to].emit("receiveMessage", data)
    })
    socket.on('sendMessageG', function(data){
        io.to(data.to).emit("receiveMessage", data)
    })
});

http.listen(9001, function(){
    console.log('Socket');
});