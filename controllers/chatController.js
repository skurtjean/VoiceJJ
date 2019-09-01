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
router.get('/getFriends', function(req, res){
    me = req.query.me;
    friends = [];
    let cursor = req.app.locals.banco.collection('friends').aggregate([
        { "$match": {"_id1": new ObjectId(me), "type": 1}},
        {
            "$lookup": {
                "from": 'user',
                "localField": '_id2',
                "foreignField": "_id",
                "as": 'user'
            }
        }
    ]).forEach((results) =>{
        let cursor2 = req.app.locals.banco.collection('friends').aggregate([
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
router.get('/getGroups', function(req, res){
    me = req.query.me;
    let cursor = req.app.locals.banco.collection('friends').find( {"_id1": new ObjectId(me), "type": 2}).toArray((err, results) => {
        res.json(results);
    });
});

module.exports = router