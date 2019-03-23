var express = require('express');
var router = express.Router();
var urineDataController = require('../models/UrinetestResults');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//Add UrineTest Data
router.post('/',(req,res) => {

    if(typeof req.body === undefined || typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        urineDataController.insertUrinedata(req.body, req.files, req.headers, req, (result) => {

            res.send(result);

        })
    }

});

//Delete UrineTest Data
router.delete('/',(req,res) => {

    if(typeof req.body === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
        urineDataController.deleteResults(req.body,(result) => {
            res.json(result);
        });
    }

});

module.exports=router;