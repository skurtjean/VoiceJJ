const express           = require('express')
const fs 				= require("fs")
const app               = express()
const https             = require('https')
var privateKey = fs.readFileSync('.ssl/private.key').toString();
var certificate = fs.readFileSync('.ssl/certificate.crt').toString();

var credentials = {key: privateKey, cert: certificate};
const server            = https.createServer(credentials, app);
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerserver        = ExpressPeerServer(server, { debug: true });

app.use('/peerjs', peerserver);

server.listen(9000, function(){
    console.log('Peer');
});