var express = require('express');
var router = express.Router();
var profile = require('../models/DeleteAllData');

//Delete TestReservInfo
router.delete('/',(req,res) => {

    if(typeof req.body.username === 'undefined'){
        res.json({result:'error',message:'no content found'});
    }else {
        profile.deleteData(req.body,(result) => {
            console.log('result...',result);
            res.json(result);
        })
    }

});

module.exports=router;