const express = require('express')
const ObjectId = require('mongodb').ObjectId
const router = express.Router()

router.get('/addFriend', function(req, res){
    var f = req.query.friend;
    me = req.session._id;
    req.app.locals.banco.collection('user').find({'nome': f}).toArray((err, result) => {
        let friends = {
            _id1: new ObjectId(me),
            _id2: result[0]._id,
            type: 1,
            created_at: new Date()
        }
        req.app.locals.banco.collection('friends').insertOne(friends, (err, result) => {
            if(err) {
                console.log(err)
                res.write('0');
                res.end();
            }
            res.write('1');
            res.end();
        });
    });
});
router.get('/acceptFriend', function(req, res){

});
router.get('/addGroup', function(req, res){
    var group = req.query.group;
    me = req.session._id;
    let friends = {
        _id1: new ObjectId(me),
        _id2: group,
        type: 2,
        created_at: new Date()
    }
    req.app.locals.banco.collection('friends').insertOne(friends, (err, result) => {
        if(err) {
            console.log(err)
            res.write('0');
            res.end();
        }
        res.write('1');
        res.end();
    });
});


module.exports = router