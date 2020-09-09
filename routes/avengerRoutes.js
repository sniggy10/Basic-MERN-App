const express = require('express');
const mongoose = require('mongoose');
const weapons = require('../models/weapon')
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const dbConfig = require('../config/database.config')
router.post('/add', function(req,res){
  console.log(req.body)
  var myData = new weapons(req.body);
      myData.save()
          .then(item => {
              res.send("Name saved to database");
          })
          .catch(err => {
              res.status(400).send("Unable to save to database");
          });
})



router.get('/showall', function(req, res) {

    MongoClient.connect(dbConfig.url, function(err, db) {
            useNewUrlParser: true
        if (err) throw err;
        var dbo = db.db("avengers");
        dbo.collection("weapons").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });

})

router.post('/delete', function(req,res){

    MongoClient.connect(dbConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("avengers");
    var myquery = { avenger: req.body.avenger };
    dbo.collection("weapons").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      res.send("1 entry deleted");
      db.close();
    });
  });
  })


router.post('/update', function(req, res) {

    MongoClient.connect(dbConfig.url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("avengers");
        var myquery = {
            avenger: req.body.avenger
        };
        var newvalues = {
            $set: {
                avenger: req.body.avenger,
                weapon: req.body.weapon
            }
        };
        dbo.collection("weapons").updateOne(myquery, newvalues, function(err, result) {
            if (err) throw err;
            res.send("1 document updated with aventitleger: " + req.body.avenger);
            db.close();
        });
    });
})

//   router.get('/titles', function(req,res){
  
//     MongoClient.connect(dbConfig.url, function(err, db) {
//           useNewUrlParser: true
//       if (err) throw err;
//       var dbo = db.db("avengers");
//       var mysort = { title: -1 };
//       dbo.collection("weapons").find({},{ projection: { _id: 0, title: 1} }).sort(mysort).toArray(function(err, result) {
//         if (err) throw err;
//         res.send(result);
//         db.close();
//       });
//     });
  
//   })

//   router.post('/updatecontent', function(req,res){
  
//     MongoClient.connect(dbConfig.url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("avengers");
//     var myquery = { title: req.body.title };
//     var newvalues = { $set: {tile: req.body.title,content: req.body.content} };
//     dbo.collection("weapons").updateOne(myquery, newvalues, function(err, result) {
//       if (err) throw err;
//       res.send("1 document updated with title: "+req.body.title);
//       db.close();
//     });
//   });
//   })

//   router.post('/updatetitle', function(req,res){
  
//     MongoClient.connect(dbConfig.url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("avengers");
//     var myquery = { title: req.body.title };
//     var newvalues = { $set: {title: req.body.newtitle} };
//     dbo.collection("weapons").updateOne(myquery, newvalues, function(err, result) {
//       if (err) throw err;
//       res.send("1 document updated with title: "+req.body.title);
//       db.close();
//     });
//   });
  
//   })


module.exports = router;