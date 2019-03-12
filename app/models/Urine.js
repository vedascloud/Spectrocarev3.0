var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrineSchema = new Schema({

    username:{
        type:String,
        index:true,
        required:true
    },
    testId:{
        type:String,
        required:true,
        index : true,
        unique : true
    },
    clientType : {
        type : String,
        required : true
    },
    client_Id : {
        type : String,
        required : true
    },
    clientName : {
        type : String,
        required : true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    weightScore:{
        type:String,
        required:true
    },
    kidneyScore:{
        type:String,
        required:true
    },
    diabetesScore:{
        type:String,
        required:true
    },
    urinaryTractScore:{
        type:String,
        required:true
    },
    liverScore:{
        type:String,
        required:true
    },
    preHealthcheckInfo:[{
    }],
    testFactors:[{
        flag:{
            type:Boolean,
            required:true
        },
        healthReferenceRanges:{
            type:String,
            required:true
        },
        result:{
            type:String,
            required:true
        },
        testName:{
            type:String,
            require:true
        },
        unit:{
            type:String,
            required:true
        },
        value:{
            type:String,
            required:true
        },
        score:{
            type:String,
            required:true
        }
    }],
    testedTime:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('urineResult',UrineSchema);