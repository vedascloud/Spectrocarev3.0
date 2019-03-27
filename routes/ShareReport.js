var express = require('express');
var router = express.Router();
var Share=require('../models/ShareReport');

router.post('/',function(req,res){

    Share.shareReport(req.body,(result) => {
        console.log('callback response..',result);
        //res.send(200,result);
        res.json(result);
    });
});

module.exports=router;