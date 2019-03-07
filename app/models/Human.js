var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HumanSchema = new Schema({

    username : {
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
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    birthday : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    bloodType : {
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
    note : {
        type : String,
        required : true
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


/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HumanSchema = new Schema({

    username : {
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
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    birthday : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    bloodType : {
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
    note : {
        type : String,
        required : true
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

module.exports = mongoose.model('Human',HumanSchema);*/
