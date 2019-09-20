const express           = require('express')
const path              = require('path')
const fs 				= require("fs")
const nunjucks          = require('nunjucks')
const serveIndex 		= require('serve-index');
const bodyparser        = require('body-parser')
const app               = express()
const https				= require('https')
const http				= require('http')
const session           = require('express-session')
const flash             = require('connect-flash')
const mongodb           = require('mongodb').MongoClient
const crypto 			= require('crypto')
const request           = require('request')

var privateKey = fs.readFileSync('.ssl/private.key').toString();
var certificate = fs.readFileSync('.ssl/certificate.crt').toString();

var credentials = {key: privateKey, cert: certificate};
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://vps13171.publiccloud.com.br");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

const socket = require('./helpers/socket.js');
const peer = require('./helpers/peer.js');


app.use(express.static(__dirname + '/assets'));

const stringDB = "mongodb://admin:VoiceJJ%40@vps13171.publiccloud.com.br/admin";
const DB   = 'admin'

let db

app.use(session({
	secret: 'Voicejj',
	resave: true,
  	saveUninitialized: true
}))

const genericRouterController     = require('./controllers/genericRouterController')
const usuarioController           = require('./controllers/usuarioController')
const chatController        = require('./controllers/chatController')

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.use(flash())

nunjucks.configure('views', {
	express: app,
	noCache: true,
	web: {
		useCache: false
	},
	watch: true
})
app.set('view engine', 'njk') 
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', genericRouterController)
app.use('/user', usuarioController)
app.use('/channel', chatController)

server = https.createServer(credentials, app)
servernormal = http.createServer(app)

mongodb.connect(stringDB, {
	useNewUrlParser: true
} , (err, client) => {
    if (err) return console.log(err);
    db = client.db(DB);    
    server.listen(443, function(){
        console.log('Express');
	});
	servernormal.listen(80, function(){
        console.log('Express porta 80');
	});
	app.locals.banco = db;
});