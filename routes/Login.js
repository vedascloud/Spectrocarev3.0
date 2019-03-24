var express = require('express');
var router = express.Router();
var Login=require('../models/Login');

router.post('/',function(req,res,next){

    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Login.loginAuthentication(req.body,(result) => {
            res.json(result);
        });
    }
});

module.exports=router;