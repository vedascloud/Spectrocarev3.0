var express = require('express');
var router = express.Router();
var bloodDataController = require('../models/BloodResults');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//Add BloodTest Data
router.post('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        bloodDataController.insertBloodData(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

/*router.post('/',(req,res) => {

    if(typeof req.body === undefined && typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
        console.log('request body..',req.body);
        bloodDataController.insertBloodData(req.body, req.files, req.headers, req, (result) => {

            res.json(result);

        })
    }

});*/

//Delete BloodTest Data
router.delete('/',(req,res) => {

    if(typeof req.body === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
        bloodDataController.deleteBloodData(req.body,(result) => {
            res.json(result);
        });
    }
});
module.exports=router;