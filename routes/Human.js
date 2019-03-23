var express = require('express');
var router = express.Router();
var profile = require('../models/Human');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//Add HumanInfo
router.post('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.insertHumanInfo(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

//Update HumanInfo
router.put('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.updateHumanInfo(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

//Fetch HumanInfo
router.post('/fetch',(req,res) => {

    profile.fetchHumanInfo(req.body,(result) => {
        console.log(result);
        res.json(result);
    })

});

//Delete HumanInfo
router.delete('/',(req,res) => {

    if(typeof req.body.clientId === 'undefined'){
        res.json({result:'error',message:'no content found'});
    }else {
        profile.deleteHumanInfo(req.body,(result) => {
            console.log('result...',result);
            res.json(result);
        })
    }

});

module.exports=router;