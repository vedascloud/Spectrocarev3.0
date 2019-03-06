var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestReservationSchema = new Schema({

    clientType : {
        type : String,
        required : true
    },
    clientId : {
        type : String,
        required : true,
        index : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    data : {
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
        type : String,
        required : true
    }

});

module.exports = mongoose.model('testReservation',TestReservationSchema);