var HospotalDB = require('../app/models/Hospital');
var HumanDB = require('../app/models/Human');

var HumanController = {

    addHumanClient :(userParam,callback) => {

        const username = userParam.username;

        if (validator.isEmail(username)) {

                HospotalDB.findOne({username : new RegExp(username, 'i'),verification_status:true}).exec().then((HospitalFound) => {

                    HumanDB.findOne({email : userParam.email}).exec().then((HumanFound) => {

                        if (HumanFound) {
                            console.log('Update Human Data...');

                        }
                        else {
                            console.log('Add Human Data...');
                        }

                    }).catch((error) => {
                        throw error;
                    });

                }).catch((error) => {
                    throw error;
                });

        } else {
            callback({ response: '0', message: 'please pass a valid email address' });
        }
    },

    updateHumanClient : (userParam,callback) => {

    },

    fetchHumanClient : (userParam,callback) => {

    },

    deleteHumanClient : (userParam,callback) => {

    }

};
module.exports = HumanController;