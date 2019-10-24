const express           = require('express')
const fs 				= require("fs")
const app               = express()
const https             = require('https')
const mongodb           = require('mongodb').MongoClient

var privateKey = fs.readFileSync('.ssl/private.key').toString();
var certificate = fs.readFileSync('.ssl/certificate.crt').toString();
const stringDB = "mongodb://admin:VoiceJJ%40@vps13171.publiccloud.com.br/admin";

var credentials = {key: privateKey, cert: certificate};


const server            = https.createServer(credentials, app);
const io                = require('socket.io')(server);

var userssocket = {};
var groupAudio = [];
var groupVideo = [];
var arrayResponse = [];
//socket functions (ou emits, o que preferir)
io.on('connection', function(socket){
    socket.on('join', function(data){
        userssocket[data._id] = socket;
    });
    socket.on('joinG', function(data){
        socket.join(data.to);
    });
    socket.on('joinaudio', function(data){
        if(groupAudio[data.to] == undefined){
            groupAudio[data.to] = [];
        }
        if(groupVideo[data.to] == undefined){
            groupVideo[data.to] = [];
        }
        groupAudio[data.to].push(data.me);
        arrayResponse[0] = groupAudio[data.to];
        arrayResponse[1] = groupVideo[data.to];
        io.to(data.to).emit('NewUserCall', arrayResponse);
    });
    socket.on('joinVideo', function(data){
        if(groupAudio[data.to] == undefined){
            groupAudio[data.to] = [];
        }
        if(groupVideo[data.to] == undefined){
            groupVideo[data.to] = [];
        }
        groupVideo[data.to].push(data.me);
        arrayResponse[0] = groupAudio[data.to];
        arrayResponse[1] = groupVideo[data.to];
        io.to(data.to).emit('NewUserCall', arrayResponse);
    });
    socket.on('disconnect', function(){
    });
    socket.on('sendMessageF', function(data){
        userssocket[data.to].emit("receiveMessage", data);
        let msg = {
            fromUserId: data.fromUserId,
            to: data.to,
            msg: data.message,
        }
        mongodb.connect(stringDB, { useNewUrlParser: true } , (err, client) => {
            if (err) return console.log(err);
            db = client.db('admin'); 
            db.collection('msgs').insertOne(msg, (err, result) => {
                if (err) return console.log(err);
            });
        });
    })
    socket.on('sendMessageG', function(data){
        io.to(data.to).emit("receiveMessage", data);
        let msg = {
            from: data.fromUserId,
            to: data.to,
            msg: data.msg,
        }
        mongodb.connect(stringDB, { useNewUrlParser: true } , (err, client) => {
            if (err) return console.log(err);
            db = client.db('admin'); 
            db.collection('msgs').insertOne(msg, (err, result) => {
                if (err) return console.log(err);
            });
        });
    })
    socket.on('callVideo', function(data){
        userssocket[data.to].emit('CallVideo');
    });
});

server.listen(9001, function(){
    console.log('Socket');
});