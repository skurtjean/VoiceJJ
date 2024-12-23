const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const ExpressPeerServer = require('peer').ExpressPeerServer;
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io')(http);
const crypto = require('crypto');
const uri = "mongodb://Voicejj:Voicejj@vps13171.publiccloud.com.br/voicejj";

app.set('view engine', 'ejs');
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://vps13171.publiccloud.com.br");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
app.use(session({secret: 'Voicejj',saveUninitialized: true,resave: true}))
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended:true}));
var userson = {};
var userssocket = {};
var group = 0;
var groups = [];
groups[0] = [];
groups[1] = [];

var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, { debug: true });
app.use('/peerjs', peerserver);



//socket functions (ou emits, o que preferir)
io.on('connection', function(socket){
    console.log('O maot é um vagabundo');
    socket.on('join', function(data){
        userssocket[data._id] = socket;
        io.emit('onlineUsers', {userson});
    });
    socket.on('disconnect', function(){
    });
    socket.on('sendMessage', function(data){
        for (var key in groups[data.to]){
            userssocket[key].emit("receiveMessage", {fromUsername: userson[data.fromUserId].user, to: data.to, message: data.message});
        }
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



//funções
function autentica(data){
    if(!(data in userson)){
        return false;
    }
    else{
        return true;
    }
}



//urls
app.get('/', function(req, res) { 
    res.render('Home.ejs'); 
});
app.get('/login', function(req, res) { 
    res.render('Login.ejs');
});
app.post('/logar', function(req, res) { 
    var email = req.body.email;
    var password = crypto.createHash('md5').update(req.body.pass).digest('hex');
    let cursor = db.collection('users').find({"email": email, "password": password}).toArray((err, results) => {
        if (err) return console.log(err);
        if(results[0]){
            userson[results[0]._id] = req.session;
            userson[results[0]._id]._id = results[0]._id;
            userson[results[0]._id].email = results[0].email;
            userson[results[0]._id].user = results[0].username;
            res.redirect('/principal');
        }
        else{
            res.render('Login.ejs', {
                error: 'E-mail ou senha incorreto'
            });
        }
    });
});
app.get('/cadastro', function(req, res) { 
    res.render('Cadastro.ejs');
});
app.post('/cadastrar', function(req, res) {
    var email = req.body.email;
    let cursor = db.collection('users').find({"email": email}).limit(1).toArray((err, results) => {
        if(err) return console.log(err);
        if(results[0]){
            res.render('Cadastro.ejs',{
                error: 'E-mail já cadastrado'
            });
        }
        else{        
            var user = req.body.user;
            var password = crypto.createHash('md5').update(req.body.pass).digest('hex');
            var users = new Object();
            users.email = email;
            users.username = user;
            users.password = password;
            db.collection('users').insertOne(users, (err, result) => {
                if (err) return console.log(err);
                userson[result.ops[0]._id] = req.session;
                userson[result.ops[0]._id]._id = result.ops[0]._id;
                userson[result.ops[0]._id].email = result.ops[0].email;
                userson[result.ops[0]._id].user = result.ops[0].username;
                res.redirect('/principal');
            });
        }
    });
});
app.get('/principal', function(req, res){
    if(autentica(req.session._id)){
        group = (group == 0)? 1 : 0;
        groups[group][req.session._id] = req.session.user;
        res.render('Principal.ejs', {
            users: userson,
            sessao: req.session._id,
            grupo: group
        });
    }
    else{
        res.redirect('/login');
    }
});


//Portas de cada um
MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('Voicejj');    
    app.listen(80, function(){
        console.log('Express');
    });
});

server.listen(9000, function(){
    console.log('Peer');
});

http.listen(9001, function(){
    console.log('Socket');
});