var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestReservationSchema = new Schema({

    username : {
        type : String,
        required : true
    },
    //It is from Client Collection
    id : {
        type:String,
        index:true,
        required:true
    },
    testReservNo : {
        type : String,
        required : true
    },
    clientId : {
        type : String,
        required : true
    },
    clientType : {
        type : String,
        required : true
    },
    EMail : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    testName : {
        type : String,
        required : true
    },
    note : {
        type : String
    }

});

module.exports = mongoose.model('testReservation',TestReservationSchema);