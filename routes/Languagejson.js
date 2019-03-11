var express = require('express');
var router = express.Router();
var langController=require('../models/Languagejsonfile');
router.get('/',function(req,res,next){

	langController.fetchLanguage((result) => {
        res.json(result);
    })

});

router.put('/', function(req,res,next) {

    if(typeof req.body === undefined){
        res.json({response:'0',message:'no body request'});
    }else{
        langController.updateLanguage(req.body,(result) => {
            console.log(result);
            res.json(result);
        })
    }
});

module.exports = router;