const express           = require('express')
const app               = express()
const server            = require('http').createServer(app);
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerserver        = ExpressPeerServer(server, { debug: true });

app.use('/peerjs', peerserver);

server.listen(9000, function(){
    console.log('Peer');
});