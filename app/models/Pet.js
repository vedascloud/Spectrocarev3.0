var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({

    username : {
        type : String,
        index:true,
        required : true
    },
    clientId : {
        type : String,
        required : true
    },
    ownerName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String
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
    breed : {
        type : String
    },
    height : {
        type : String
    },
    weight : {
        type : String
    },
    neuter : {
        type : String,
        required : true
    },
    note : {
        type : String
    },
    addedTime : {
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Pet',PetSchema);