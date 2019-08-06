var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('sdkjsonfilesforengg', new Schema({

        id:{
            type:String,
            required:true,
            unique:true
        },
        filename:{
            type:String,
            required:true,
            unique:true
        },
        category:{
            type:String,
            required:true
        },
        addedDate:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }

    })
);