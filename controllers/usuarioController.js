const express = require('express')
const router = express.Router()
const ObjectID = require('mongodb').ObjectId
const session = require('express-session')
const { check, validationResult } = require('express-validator')
const crypto            = require('crypto');
const validacoes = require('./validacoesController')

function autentica(data){
    if(!(data in userson)){
        return false;
    }
    else{
        return true;
    }
}


router.get('/login', function(req, res) { 
    res.render('Login.njk');
});
router.post('/logar', function(req, res){
	var email = req.body.email;
    var password = crypto.createHash('md5').update(req.body.pass).digest('hex');
    let cursor = req.app.locals.banco.collection('user').find({"email": email, "password": password}).toArray((err, results) => {
        if (err) return console.log(err);
        if(results[0]){
            res.redirect('/users');
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
            res.render('Cadastro.ejs',{
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
                res.redirect('/users');
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

module.exports = router