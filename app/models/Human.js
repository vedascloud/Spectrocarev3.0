var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HumanSchema = new Schema({

    username : {
        type:String,
        index:true,
        required:true
    },
    id : {
        type:String,
        index:true,
        required:true,
        unique:true
    },
    clientId : {
        type:String,
        required:true
    },
    name : {
        type:String,
        required:true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type:String
    },
    birthday : {
        type:String
    },
    age : {
        type:String,
        required:true
    },
    gender : {
        type:String,
        required:true
    },
    bloodType : {
        type:String
    },
    height : {
        type:String
    },
    weight : {
        type:String
    },
    note : {
        type:String
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

module.exports = mongoose.model('Human',HumanSchema);
