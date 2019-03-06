var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({


    clientId : {
        type : String,
        required : true,
        index : true,
        unique : true
    },
    ownerName : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    petName : {
        type : String,
        required : true
    },
    birthday : {
        type : String,
        required : true
    },
    petType : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    bread : {
        type : String,
        required : true
    },
    height : {
        type : String,
        required : true
    },
    weight : {
        type : String,
        required : true
    },
    neuter : {
        type : String,
        required : true
    },
    note : {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('Human',HumanSchema);