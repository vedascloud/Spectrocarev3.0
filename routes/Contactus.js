var express = require('express');
var router = express.Router();
var ContactusModel=require('../models/Contactus');

router.post('/',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({response:'0',message:'no content to process your request'});
    }else {
        ContactusModel.takingFeedback(req.body, (result) => {
            console.log(result);
            res.json(result);
        });
    }

});

module.exports=router;