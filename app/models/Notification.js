var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Mobile', new Schema({

    username: {
        type:String,
        unique:true,
		index:true,
        required:true
    },

    devices:{

        web:[{
            deviceid: {
                type:String
            },
            deviceToken: {
                type:String
            },
            login: Boolean
        }],

        mobile:[{
            deviceid: {
                type:String,
                required:true
            },
            deviceToken: {
                type:String,
                required:true
            },
            login:Boolean
        }]

    }
}));