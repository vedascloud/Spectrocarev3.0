var express = require('express');
var router = express.Router();
var jsonController = require('../models/sdkjsonfilesforengg');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post('/upload',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        jsonController.uploadJSON(req.body, req.files, req.headers, req, (result) => {

            res.send(result);
        })
    }

});

router.post('/fileread',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        jsonController.fetchJSONFile(req.body, (result) => {

            res.set('Content-Type','application/json');
            res.send(result);

            //res.send({result});
        })
    }

});

router.post('/getallstripes',(req,res) => {

    jsonController.fetchJSON(req.body,(result) => {
        console.log(result);
        res.json(result);
    })

});

router.delete('/',(req,res) => {

    if(typeof req.body.filename === 'undefined'){
        res.json({result:'error',message:'no content found'});
    }else {
        jsonController.deleteJSON(req.body,(result) => {
            console.log('result...',result);
            res.json(result);
        })
    }

});

module.exports=router;