var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactUsSchema = new Schema({

    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Message : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('contactUs',ContactUsSchema);