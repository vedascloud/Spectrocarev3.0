var express = require('express');
var router = express.Router();
var Register=require('../models/Register');
router.post('/', (req,res) => {
    if(typeof req.body === 'undefined'){
        res.json({response:'0',message:'no content to process your request'});
    }else {
        Register.addCustomer(req.body, (result) => {
            console.log('callback response...', result);
            res.json(result);
        });
    }
});

module.exports=router;

