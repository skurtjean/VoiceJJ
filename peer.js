const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const ExpressPeerServer = require('peer').ExpressPeerServer;
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io')(http);
const crypto = require('crypto');
const uri = "mongodb+srv://Voicejj:Voicejj2019@voicejj-dszcc.mongodb.net/test?retryWrites=true";

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
var userslog = [];

var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, { debug: true });
app.use('/peerjs', peerserver);

io.on('connection', function(socket){
    console.log('O maot é um vagabundo');
    /*socket.on('join', function(data){
        users[data.from] = socket;
    });
    socket.on('disconnect', function(){
        console.log('O maot é um otário');
    });*/
    socket.on('sendMessage', function(data){
        console.log("O Nicholas é um merda");
        console.log(data)
        io.emit("receiveMessage", data.message);
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
    if(!(data in userslog)){
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
            userslog[results[0]._id] = req.session;
            userslog[results[0]._id]._id = results[0]._id;
            userslog[results[0]._id].email = results[0].email;
            userslog[results[0]._id].user = results[0].username;
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
                userslog[result.ops[0]._id] = req.session;
                userslog[result.ops[0]._id]._id = result.ops[0]._id;
                userslog[result.ops[0]._id].email = result.ops[0].email;
                userslog[result.ops[0]._id].user = result.ops[0].username;
                res.redirect('/principal');
            });
        }
    });
});
app.get('/principal', function(req, res){
    if(autentica(req.session._id)){
        res.render('Principal.ejs', {
            users: userslog,
            sessao: req.session._id,
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