var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HospitalInfoSchema = new Schema({

    username : {
        type : String,
        required : true,
        index : true,
        unique : true
    },
    hospitalId:{
        type : String,
        required : true
    } ,
    name : {
        type : String,
        required : true
    },

    telephone : {
        type : String,
        required : true
    },
    fax : {
        type : String
    },
    contactPerson : {
        type : String
    },
    address : {
        type : String,
        required : true
    },
    addedTime:{
        type:String,
        required:true
    },
    profilePic : {
        type:String,
        required:true
    }

});

module.exports = mongoose.model('HospitalInfo',HospitalInfoSchema);