const express = require('express')
const router = express.Router()
const ObjectID = require('mongodb').ObjectId
const session = require('express-session')
const { check, validationResult } = require('express-validator')
const crypto            = require('crypto');
const ObjectId = require('mongodb').ObjectId
const validacoes = require('./validacoesController')

router.get('/', async function(req, res){
    res.render('Principal.njk', {
        "me": req.session._id,
        "myName": req.session.nome,
    });
});
router.get('/login', function(req, res) { 
    res.render('Login.njk');
});
router.post('/logar', function(req, res){
	var email = req.body.email;
    var password = crypto.createHash('md5').update(req.body.pass).digest('hex');
    let cursor = req.app.locals.banco.collection('user').find({"email": email, "senha": password}).toArray((err, results) => {
        if (err) return console.log(err);
        if(results[0]){
            req.session._id = results[0]._id;
            req.session.nome = results[0].nome;
            res.redirect('/user');
        }
        else{
            res.render('Login.njk', {
                error: true
            });
        }
    });
});
router.get('/cadastro', function(req, res) { 
    res.render('Cadastro.njk', {errors: req.flash('errors')});
});
router.post('/cadastrar', [
    validacoes.user
], (req, res, next) => {
    var email = req.body.email;
    let cursor = req.app.locals.banco.collection('users').find({"email": email}).limit(1).toArray((err, results) => {
        if (itsWrong(req)){
            return res.redirect('cadastro')
        }
        if(err) return console.log(err);
        if(results[0]){
            res.render('Cadastro.njk',{
                error: 'E-mail já cadastrado'
            });
        }
        else{
			let user = {
                email: req.body.email,
                nome: req.body.nome,
				senha: crypto.createHash('md5').update(req.body.pass).digest('hex'),
				created_at: new Date()
			}
            req.app.locals.banco.collection('user').insertOne(user, (err, result) => {
                if (err) return console.log(err);
                let cursor = req.app.locals.banco.collection('user').find({"email": user.email, "senha": user.senha}).toArray((err, results) => {
                    if (err) return console.log(err);
                    if(results[0]){
                        req.session._id = results[0]._id;
                        req.session.nome = results[0].nome;
                        res.redirect('/user');
                    }
                    else{
                        res.render('Cadastro.njk', {
                            error: true
                        });
                    }
                });
            });
        }
    });
});

function itsWrong(req) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        req.flash('errors', errors.array())
        req.flash('user', req.body);
        return true

    } else {

        return false

    }

}

router.get('/getFriends', async function getFriends(req, res){
    me = req.query.me;
    friends = [];
    let cursor = await req.app.locals.banco.collection('friends').aggregate([
        { "$match": {"_id1": new ObjectId(me), "type": 1}},
        {
            "$lookup": {
                "from": 'user',
                "localField": '_id2',
                "foreignField": "_id",
                "as": 'user'
            }
        }
    ]).forEach(async function(results) {
        let cursor2 = await req.app.locals.banco.collection('friends').aggregate([
            { $match: {"_id1": new ObjectId(results._id2), "_id2": new ObjectId(me), "type": 1}},
            {
                $lookup: {
                    from: 'user',
                    localField: '_id1',
                    foreignField: "_id",
                    as: 'user'
                }
            }
        ]).forEach((resultsF) => {
            friends.push(results);
        });
    });
    setTimeout(function(){ res.json(friends) }, 500);
});

router.get('/getGroups', async function getGroups(req, res){
    me = req.query.me;
    result = await req.app.locals.banco.collection('friends').find( {"_id1": new ObjectId(me), "type": 2}).toArray();
    res.json(result);
});

module.exports = router