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
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
        required: true
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

mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
<<<<<<< HEAD
=======
//mongoose.connect(config.connectionString, { useNewUrlParser: true });
>>>>>>> 56a181896b4fe848cfd3f1c2f7ea645e9af540b0

module.exports = mongoose.model('Hospital',HospitalSchema);