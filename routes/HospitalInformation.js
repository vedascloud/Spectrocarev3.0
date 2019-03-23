var express = require('express');
var router = express.Router();
var profile = require('../models/HospitalInformation');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//Add HospitalInfo
router.post('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
       
        profile.insertHospitalInfo(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

//Update HospitalInfo
router.put('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
        
        profile.updateHospitalInfo(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

//Fetch HospitalInfo
router.post('/fetch',(req,res) => {

    profile.fetchHospitalInfo(req.body,(result) => {
        console.log(result);
        res.json(result);
    })

});

//Delete HospitalInfo
router.delete('/',(req,res) => {

    if(typeof req.body.hospitalId === 'undefined'){
        res.json({result:'error',message:'no content found'});
    }else {
        profile.deleteHospitalInfo(req.body,(result) => {
            console.log('result...',result);
            res.json(result);
        })
    }

});

module.exports=router;