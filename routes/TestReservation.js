var express = require('express');
var router = express.Router();
var profile = require('../models/TestReservation');

router.post('/',(req,res) => {

    if(typeof req.body === 'undefined' ){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.insertTestReservInfo(req.body, (result) => {

            res.send(result);

        })
    }

});

router.post('/fetch',(req,res) => {

    profile.fetchTestReservInfo(req.body,(result) => {
        console.log(result);
        res.json(result);
    })
});

router.put('/',(req,res) => {

    if(typeof req.body === 'undefined' ){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.updateTestReservInfo(req.body, (result) => {

            res.send(result);

        })
    }
});

router.delete('/',(req,res) => {
    if(typeof req.body === 'undefined'){
        res.json({result:'error',message:'no content found'});
    }else {
        profile.deleteTestReservInfo(req.body,(result) => {
            console.log('result...',result);
            res.json(result);
        })
    }
});


module.exports=router;