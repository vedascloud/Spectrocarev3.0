var Hospital = require('../app/models/Hospital');
var HospitalInfo = require('../app/models/HospitalInfo');
var urine = require('../app/models/Urine');

var validator = require('validator');
var notify = require('../app/models/Notification');

const opts = {
    errorEventName: 'error',
    logDirectory: './mylogfiles', // NOTE: folder must exist and be writable...
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};

const log = require('simple-node-logger').createRollingFileLogger(opts);

var Login = {

    loginAuthentication: (userParam, callback) => {

        const username = userParam.username;

        if (validator.isEmail(username)) {

            if (userParam.Linked === 'Linked') {

                Hospital.findOne({ username: new RegExp(username, 'i') }).exec()
                    .then((userFound) => {

                        if (userFound) {

                            if (userFound.password === userParam.password) {

                                Hospital.updateOne({ username: new RegExp(username, 'i') }, { $set: { register_type: "Linked" } }).exec()
                                    .then((userUpdated) => {

                                        HospitalInfo.findOne({ username: new RegExp(username, 'i') }).exec()
                                            .then((pinfo) => {
                                                if (pinfo) {

                                                    urine.find({ username: new RegExp(username, 'i'), member_id: "admin" }).exec()
                                                        .then((urineData) => {

                                                                                    if (userParam.from === 'web') {

                                                                                        notify.findOne({ username: new RegExp(username, 'i') }).exec()
                                                                                            .then((notifications) => {

                                                                                                if (notifications) {
                                                                                                    let found = false;
                                                                                                    notifications.devices.web.map((notifyData) => {
                                                                                                        if (notifyData.deviceid === userParam.deviceid) {
                                                                                                            found = true;
                                                                                                            notify.updateOne(
                                                                                                                {
                                                                                                                    'username': username,
                                                                                                                    'devices.web.deviceid': userParam.deviceid
                                                                                                                },
                                                                                                                {
                                                                                                                    '$set':
                                                                                                                    {
                                                                                                                        'devices.web.$': {
                                                                                                                            deviceToken: userParam.deviceToken,
                                                                                                                            deviceid: userParam.deviceid,
                                                                                                                            login: true
                                                                                                                        }

                                                                                                                    }
                                                                                                                }).exec()
                                                                                                                .then((updated) => {
                                                                                                                    console.log(updated);
                                                                                                                })
                                                                                                                .catch((error) => {
                                                                                                                    throw error;
                                                                                                                })
                                                                                                        }
                                                                                                    })
                                                                                                    
                                                                                                    if (found === false) {

                                                                                                        notify.updateOne(
                                                                                                            { _id: notifications._id, username: new RegExp(username, 'i') },
                                                                                                            {
                                                                                                                "$push": {

                                                                                                                    "devices.web": {
                                                                                                                        deviceid: userParam.deviceid,
                                                                                                                        deviceToken: userParam.deviceToken,
                                                                                                                        login: true
                                                                                                                    }
                                                                                                                }

                                                                                                            }).exec()
                                                                                                            .then((notifyPushed) => {
                                                                                                            })
                                                                                                            .catch((error) => {
                                                                                                                log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                     
                                                                                                            })
                                                                                                    }

                                                                                                } else {
                                                                                                    var obj = new notify({
                                                                                                        username: username,
                                                                                                        devices: {
                                                                                                            web: [{
                                                                                                                deviceid: userParam.deviceid,
                                                                                                                deviceToken: userParam.deviceToken,
                                                                                                                login: true
                                                                                                            }]
                                                                                                        }
                                                                                                    });
                                                                                                    obj.save((success) => {
                                                                                                        log.info('device insertion status', success, ' accepted at ', new Date().toJSON());
                                                                                                    });
                                                                                                }
                                                                                            })
                                                                                            .catch((error) => {

                                                                                                log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                                    
                                                                                            })

                                                                                    } else {
                                                                                        notify.findOne({ username: new RegExp(username, 'i') }).exec()
                                                                                            .then((notifications) => {

                                                                                                 if (notifications) {
                                                                                                    let found = false;
                                                                                                    notifications.devices.mobile.map((notifyData) => {
                                                                                                        if (notifyData.deviceid === userParam.deviceid) {
                                                                                                            found = true;
                                                                                                            notify.updateOne(
                                                                                                                {
                                                                                                                    'username': username,
                                                                                                                    'devices.mobile.deviceid': userParam.deviceid
                                                                                                                },
                                                                                                                {
                                                                                                                    '$set':
                                                                                                                    {
                                                                                                                        'devices.mobile.$': {
                                                                                                                            deviceToken: userParam.deviceToken,
                                                                                                                            deviceid: userParam.deviceid,
                                                                                                                            login: true
                                                                                                                        }

                                                                                                                    }
                                                                                                                }).exec()
                                                                                                                .then((updated) => {
                                                                                                                    log.info('device updated',updated+"at"+Date.now())
                                                                                                                })
                                                                                                        }
                                                                                                    });
                                                                                                    if (found === false) {
                                                                                                        
                                                                                                        notify.updateOne(
                                                                                                            { _id: notifications._id, username: new RegExp(username, 'i') },
                                                                                                            {
                                                                                                                "$push": {

                                                                                                                    "devices.mobile": {
                                                                                                                        deviceid: userParam.deviceid,
                                                                                                                        deviceToken: userParam.deviceToken,
                                                                                                                        login: true
                                                                                                                    }
                                                                                                                }

                                                                                                            }).exec()
                                                                                                            .then((notifyPushed) => {
                                                                                                                log.info('notification updated..',updated+new Date().toJSON());
                                                                                                            })
                                                                                                            .catch((error) => {
                                                                                                                log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                                
                                                                                                            })
                                                                                                    }

                                                                                                }else{
                                                                                                    var obj = new notify({
                                                                                                        username: username,
                                                                                                        devices: {
                                                                                                            mobile: [{
                                                                                                                deviceid: userParam.deviceid,
                                                                                                                deviceToken: userParam.deviceToken,
                                                                                                                login: true
                                                                                                            }]
                                                                                                        }
                                                                                                    });
                                                                                                    obj.save((success) => {

                                                                                                        log.info('device insertion status', success, ' accepted at ', new Date().toJSON());
                                                                                                
                                                                                                    });
                                                                                                }
                                                                                            })
                                                                                            .catch((error) => {
                                                                                                log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                                
                                                                                            })
                                                                                    }

                                                                                    var r = { response: '3',  hospital_data: [pinfo], Test_Results: urineData,  prefer_language: 'English' };
                                                                                    callback(r);

                                                        })
                                                        .catch((error) => {
                                                            log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                     
                                                        })

                                                }
                                            });

                                    })
                                    .catch((Error) => {
                                        
                                        log.info('device insertion status', error, ' accepted at ', new Date().toJSON()); 
                                        throw Error;                                     
                                    })

                            } else{
                                
                                var r1 = { response: '0', message: 'The username or password is incorrect' };
                                callback(r1);
                            }
                        } else {

                            callback({ response: '2', message: 'No data found. Please register with us' });

                        }

                    })
                    .catch((error) => {
                        log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                     
                    })

            } else {

                Hospital.findOne({ username: new RegExp(username, 'i') }).exec()
                    .then((userFound) => {
                        log.info('user found ', userFound, ' accepted at ', new Date().toJSON());
                        if (userFound) {
                            if (userFound.register_type !== 'Manual' && userFound.register_type !== 'Linked') {
                                let res = { response: '6', message: 'You have not yet set your password. Please set your password' };
                                callback(res);
                            } else if (userFound.verification_status === false) {
                                callback({ response: '0', message: 'User not verified please verify your email' });
                            } else {
                                if (userFound.password === userParam.password) {

                                    Hospital.updateOne({ username: new RegExp(username, 'i') }, { $set: { register_type: "Linked" } }).exec()
                                        .then((userUpdated) => {

                                            HospitalInfo.findOne({ username: new RegExp(username, 'i') }).exec()
                                                .then((pinfo) => {

                                                    if (pinfo) {

                                                        urine.find({ username: new RegExp(username, 'i'), member_id: "admin" },{_id:0,__v:0}).exec()
                                                            .then((urineData) => {
                                                                                        if (userParam.from === 'web') {

                                                                                            notify.findOne({username: new RegExp(username, 'i')}).exec()
                                                                                                .then((notifications) => {

                                                                                                    if (notifications) {
                                                                                                        let found = false;
                                                                                                        notifications.devices.web.map((notifyData) => {
                                                                                                            if (notifyData.deviceid === userParam.deviceid) {
                                                                                                                found = true;
                                                                                                                notify.updateOne(
                                                                                                                    {
                                                                                                                        'username': username,
                                                                                                                        'devices.web.deviceid': userParam.deviceid
                                                                                                                    },
                                                                                                                    {
                                                                                                                        '$set':
                                                                                                                            {
                                                                                                                                'devices.web.$': {
                                                                                                                                    deviceToken: userParam.deviceToken,
                                                                                                                                    deviceid: userParam.deviceid,
                                                                                                                                    login: true
                                                                                                                                }

                                                                                                                            }
                                                                                                                    }).exec()
                                                                                                                    .then((updated) => {
                                                                                                                        if (!updated) {
                                                                                                                            log.info('device insertion status', success, ' accepted at ', new Date().toJSON());

                                                                                                                        }
                                                                                                                    })
                                                                                                            }
                                                                                                        })
                                                                                                        if (found === false) {

                                                                                                            notify.updateOne(
                                                                                                                {
                                                                                                                    _id: notifications._id,
                                                                                                                    username: new RegExp(username, 'i')
                                                                                                                },
                                                                                                                {
                                                                                                                    "$push": {

                                                                                                                        "devices.web": {
                                                                                                                            deviceid: userParam.deviceid,
                                                                                                                            deviceToken: userParam.deviceToken,
                                                                                                                            login: true
                                                                                                                        }
                                                                                                                    }

                                                                                                                }).exec()
                                                                                                                .then((notifyPushed) => {
                                                                                                                })
                                                                                                                .catch((error) => {
                                                                                                                    log.info('device insertion status', error, ' accepted at ', new Date().toJSON());

                                                                                                                })
                                                                                                        }

                                                                                                    } else {
                                                                                                        var obj = new notify({
                                                                                                            username: username,
                                                                                                            devices: {
                                                                                                                web: [{
                                                                                                                    deviceid: userParam.deviceid,
                                                                                                                    deviceToken: userParam.deviceToken,
                                                                                                                    login: true
                                                                                                                }]
                                                                                                            }
                                                                                                        });
                                                                                                        obj.save((success) => {
                                                                                                            log.info('device insertion status', success, ' accepted at ', new Date().toJSON());

                                                                                                        });
                                                                                                    }
                                                                                                })
                                                                                                .catch((error) => {
                                                                                                    log.info('device insertion status', error, ' accepted at ', new Date().toJSON());

                                                                                                })

                                                                                        } else {

                                                                                            notify.findOne({username: new RegExp(username, 'i')}).exec()
                                                                                                .then((notifications) => {

                                                                                                    if (notifications) {
                                                                                                        let found = false;
                                                                                                        notifications.devices.mobile.map((notifyData) => {
                                                                                                            if (notifyData.deviceid === userParam.deviceid) {
                                                                                                                found = true;
                                                                                                                notify.updateOne(
                                                                                                                    {
                                                                                                                        'username': username,
                                                                                                                        'devices.mobile.deviceid': userParam.deviceid
                                                                                                                    },
                                                                                                                    {
                                                                                                                        '$set':
                                                                                                                            {
                                                                                                                                'devices.mobile.$': {
                                                                                                                                    deviceToken: userParam.deviceToken,
                                                                                                                                    deviceid: userParam.deviceid,
                                                                                                                                    login: true
                                                                                                                                }

                                                                                                                            }
                                                                                                                    }).exec()
                                                                                                                    .then((updated) => {
                                                                                                                    })
                                                                                                            }
                                                                                                        })
                                                                                                        if (found === false) {

                                                                                                            notify.updateOne(
                                                                                                                {
                                                                                                                    _id: notifications._id,
                                                                                                                    username: new RegExp(username, 'i')
                                                                                                                },
                                                                                                                {
                                                                                                                    "$push": {

                                                                                                                        "devices.mobile": {
                                                                                                                            deviceid: userParam.deviceid,
                                                                                                                            deviceToken: userParam.deviceToken,
                                                                                                                            login: true
                                                                                                                        }
                                                                                                                    }

                                                                                                                }).exec()
                                                                                                                .then((notifyPushed) => {

                                                                                                                })
                                                                                                                .catch((error) => {
                                                                                                                    log.info('device insertion status', error, ' accepted at ', new Date().toJSON());

                                                                                                                })
                                                                                                        }

                                                                                                    } else {

                                                                                                        var obj = new notify({
                                                                                                            username: username,
                                                                                                            devices: {
                                                                                                                mobile: [{
                                                                                                                    deviceid: userParam.deviceid,
                                                                                                                    deviceToken: userParam.deviceToken,
                                                                                                                    login: true
                                                                                                                }]
                                                                                                            }
                                                                                                        });
                                                                                                        obj.save((success) => {
                                                                                                            log.info('device insertion status', success, ' accepted at ', new Date().toJSON());

                                                                                                        });
                                                                                                    }
                                                                                                })
                                                                                                .catch((error) => {
                                                                                                    log.info('device insertion status', error, ' accepted at ', new Date().toJSON());

                                                                                                })
                                                                                        }

                                                                                        var r = {
                                                                                            response: '3',
                                                                                            hospital_data: [pinfo],
                                                                                            Test_Results: urineData,
                                                                                            prefer_language: 'English'
                                                                                        };
                                                                                        callback(r);


                                                            })
                                                           .catch((error) => {
                                                                log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                     
                                                            })

                                                    } else {
                                                        var r = { response: '3',hospital_data: [], Test_Results: [], deviceinfo: [], prefer_language: 'English' };
                                                        callback(r);
                                                    }
                                                });

                                        })
                                        .catch((Error) => {
                                            log.info('device insertion status', error, ' accepted at ', new Date().toJSON());
                                                                                     
                                        })

                                } else {
                                    var r1 = { response: '0', message: 'The username or password is incorrect' };
                                    callback(r1);
                                }
                            }
                        } else {
                            var r1 = { response: '2', message: 'No data found. Please register with us' };
                            callback(r1);
                        }
                    })
                    .catch((error) => {
                        callback({ response: '0', message: error });
                    })
            }
        } else {
           
            callback({ response: '0', message: 'please pass a valid email address' });
        }

    }
};
module.exports = Login;
