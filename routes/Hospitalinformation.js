var express = require('express');
var router = express.Router();
var profile = require('../models/Hospitalinformation');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
       
        profile.insertPersonalinfo(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

router.put('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
        
        profile.updateProfileInformation(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }
})

module.exports=router;