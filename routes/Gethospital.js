var express = require('express');
var router = express.Router();
var Doctor=require('../models/Gethospital');

router.post('/',function(req,res,next){

    Doctor.getLocation(req.body,(result) => {
        console.log('result from controller...',result);
        res.send(result);
    });
});

module.exports=router;