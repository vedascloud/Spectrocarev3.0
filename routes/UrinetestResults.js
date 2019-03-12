var express = require('express');
var router = express.Router();
var urineDataController = require('../models/UrinetestResults');
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post('/',(req,res) => {

    if(typeof req.body === undefined && typeof req.files === undefined){
        res.json({response:'0',message:'No content found to process your request'});
    }else {
       console.log('request body..',req.body);
        urineDataController.insertUrinedata(req.body, req.files, req.headers, req, (result) => {

            res.json(result);

        })
    }

});

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