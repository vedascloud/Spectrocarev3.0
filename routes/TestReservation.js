var express = require('express');
var router = express.Router();
var profile = require('../models/TestReservation');

//Add TestReservInfo
router.post('/',(req,res) => {

    if(typeof req.body === 'undefined' ){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.insertTestReservInfo(req.body, (result) => {

            res.send(result);

        })
    }

});

//Fetch TestReservInfo
router.post('/fetch',(req,res) => {

    profile.fetchTestReservInfo(req.body,(result) => {
        console.log(result);
        res.json(result);
    })

});

//Update TestReservInfo
router.put('/',(req,res) => {

    if(typeof req.body === 'undefined' ){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.updateTestReservInfo(req.body, (result) => {

            res.send(result);

        })
    }

});

//Delete TestReservInfo
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