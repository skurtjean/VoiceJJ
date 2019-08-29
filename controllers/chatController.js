const express = require('express')
const router = express.Router()

router.get('/addFriend', function(req, res){
    var friend = req.query.friend;
    me = req.session._id;
    let friends = {
        _id1: me,
        _id2: friend,
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
router.get('/addGroup', function(req, res){
    var group = req.query.group;
    me = req.session._id;
    let friends = {
        _id1: me,
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
router.get('/getFriends', function(req, res){
    me = req.query.me;
    /*let cursor = req.app.locals.banco.collection('friends').find( {"$or": [ {"_id1": me},{ "_id2": me} ], "type": 1 }).toArray((err, results) => {
        res.json(results);
    });*/
    let cursor = req.app.locals.banco.collection('friends').aggregate([
        { $match: {"type": 1, "_id1": me}},
        { $lookup:
           {
             from: 'user',
             localField: '_id2',
             foreignField: 'nome',
             as: 'friends'
           }
         }
        ]).toArray((err, results) => {
        res.json(results);
    });
});
router.get('/getGroups', function(req, res){
    me = req.query.me;
    let cursor = req.app.locals.banco.collection('friends').find( {"_id1": me, "type": 2}).toArray((err, results) => {
        res.json(results);
    });
});

module.exports = router