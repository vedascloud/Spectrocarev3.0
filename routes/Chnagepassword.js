var express = require('express');
var router = express.Router();
var modelChangepassword =require('../models/Changepassword');

router.post('/',function(req,res,next){

    if(typeof req.body === 'undefined'){
        res.json({response:'0',message:'no content to process your request'});
    }else {

        modelChangepassword.setpassword(req.body, (result) => {

            res.json(result);
        });
    }
});

module.exports=router;