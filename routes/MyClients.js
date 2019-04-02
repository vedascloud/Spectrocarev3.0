var express = require('express');
var router = express.Router();
var profile=require('../models/MyClients');

//Fetch Clients Data
router.post('/',(req,res) => {

    if(typeof req.body === 'undefined' ){
        res.json({response:'0',message:'No content found to process your request'});
    }else {

        profile.fetchClientsData(req.body, (result) => {

            res.send(result);

        })
    }

});

module.exports=router;