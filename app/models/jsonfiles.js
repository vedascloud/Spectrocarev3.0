var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Jsonfile', new Schema({

    filename:{
        type:String,
        required:true,
        unique:true
    },
    url:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    addedTime:{
        type:Date,
        required:true
    }

    })
);