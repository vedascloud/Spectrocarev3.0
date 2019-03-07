var config = require('../configfiles/config.json');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var HospitalSchema = new Schema({

    username : {
        type : String,
        required : true,
        index : true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    verification_status:{
        type:Boolean,
        default:false,
        required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    register_time:{
        type:String,
        required:true
    },
    register_type:{
        type:String,
        required:true
    },
    prefer_language:{
        type:String,
        required:true,
        default:'English'
    }

});

mongoose.connect(config.connectionString, { useNewUrlParser: true });

module.exports = mongoose.model('Hospital',HospitalSchema);