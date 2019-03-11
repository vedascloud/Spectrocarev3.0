var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Feedback', new Schema({
    username: {
        type:String,
		index:true,
        required:true
    },
    feedbackDetails:[{
        name:{
            type:String,
            required:true
        },
        mail:{
            type:String,
            required:true
        },
        token_id:{
            type:String,
            required:true
        },
        feedback:{
            type:String,
            required:true
        }
    }]
   
}));