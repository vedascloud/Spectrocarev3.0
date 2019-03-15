var express = require('express');
var router = express.Router();
var profile = require('../models/Pet');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//Add PetInfo
router.post('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.insertPetInfo(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

//Update PetInfo
router.put('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.updatePetInfo(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }
});

//Fetch PetInfo
router.post('/fetch',(req,res) => {

    profile.fetchPetInfo(req.body,(result) => {
        console.log(result);
        res.json(result);
    })
});

//Delete PetInfo
router.delete('/',(req,res) => {
    if(typeof req.body.clientId === 'undefined'){
        res.json({result:'error',message:'no content found'});
    }else {
        profile.deletePetInfo(req.body,(result) => {
            console.log('result...',result);
            res.json(result);
        })
    }
});

module.exports=router;