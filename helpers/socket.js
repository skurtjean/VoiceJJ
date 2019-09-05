const express           = require('express')
const fs 				= require("fs")
const app               = express()
const https             = require('https')

var privateKey = fs.readFileSync('.ssl/private.key').toString();
var certificate = fs.readFileSync('.ssl/certificate.crt').toString();

var credentials = {key: privateKey, cert: certificate};


const server            = https.createServer(credentials, app);
const io                = require('socket.io')(server);

var userssocket = {};
var groupAudio = [];
var groupVideo = [];
//socket functions (ou emits, o que preferir)
io.on('connection', function(socket){
    socket.on('join', function(data){
        userssocket[data._id] = socket;
    });
    socket.on('joinG', function(data){
        socket.join(data.to);
        io.to(data.to).emit('receiveMessage', data);
    });
    socket.on('joinAudio', function(data){
        if(data.type == 2){
            groupAudio[data.to].push(data.me);
            io.to(data.to).emit('joinedAudio', groupAudio[data.to]);
        }
        else{
            user
            userssocket[data.to].emit("joinedAudio", data.me);
        }
    });
    socket.on('joinVideo', function(data){

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

server.listen(9001, function(){
    console.log('Socket');
});