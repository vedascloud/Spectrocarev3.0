var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrineSchema = new Schema({

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
    clientName : {
        type : String,
        required : true
    },
    testFactors : [{}]

});

module.exports = mongoose.model('urineResults',UrineSchema);