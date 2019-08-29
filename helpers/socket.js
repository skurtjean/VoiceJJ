const express           = require('express')
const app               = express()
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
var userssocket = {};
//socket functions (ou emits, o que preferir)
io.on('connection', function(socket){
    console.log('O maot é um vagabundo');
    socket.on('join', function(data){
        userssocket[data.nome] = socket;
    });
    socket.on('disconnect', function(){
    });
    socket.on('sendMessageF', function(data){
        console.log(userssocket);
        console.log(data.to);
        userssocket[data.to].emit("receiveMessage", data)
        /*for (var key in groups[data.to]){
            userssocket[key].emit("receiveMessage", {fromUsername: userson[data.fromUserId].user, to: data.to, message: data.message});
        }*/
    });/*
    socket.on('typing', function(data){
        console.log("O Jean é um inutil");
        if (data.typing) {
            users[data.to].emit("istyping");
        } else {
            users[data.to].emit("notyping");
        }
    });*/
});

http.listen(9001, function(){
    console.log('Socket');
});