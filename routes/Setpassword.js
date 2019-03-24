var express = require('express');
var router = express.Router();
var modelNewpassword =require('../models/Setpassword');

router.post('/',function(req,res,next){

    if(typeof req.body === 'undefined'){
        res.json({response:'0',message:'no content to process your request'});
    }else {
        modelNewpassword.setpassword(req.body, (result) => {

            res.json(result);

        });
    }

});

module.exports=router;