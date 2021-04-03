var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('search_course')
});
router.post('/', function(req, res, next) {
    var course_name = ((req.body.course_name=="") ? /^/ : req.body.course_name )
    var tutor_name = ((req.body.tutor_name=="") ? /^/ : req.body.tutor_name )
    var subject = ((req.body.subject=="") ? /^/ : req.body.subject )
    var q = {name:course_name,tutor:tutor_name,subject:subject,price:{$gte:parseInt(req.body.minprice),$lte:parseInt(req.body.maxprice)}}
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            dbo.collection("courses").find(q,{ projection: { _id:1,name:1,tutor:1,price:1,subject:1,rating:1,photo_buffer:1} }).toArray(function(err, result) {
                if (err) throw err
                res.json({result:result});
                db.close();
            })
        }
    });
});
module.exports = router;