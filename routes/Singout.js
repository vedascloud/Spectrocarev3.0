var express = require('express');
var router = express.Router();
var SignoutController=require('../models/Signout');
router.post('/',function(req,res,next){

    SignoutController.sessionout(req.body,(result) => {
        console.log(result);
        res.json(result);
    })
});

module.exports=router;