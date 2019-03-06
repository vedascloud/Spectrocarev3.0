var express = require('express');
var router = express.Router();
var Verify=require('../models/Verify');
router.post('/',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({response:'0',message:'no content to process your request'});
    }else {
        Verify.verifyCustomer(req.body, (result) => {

            console.log('callback response,,,', result);
            res.json(result);

        });
    }
});
module.exports=router;