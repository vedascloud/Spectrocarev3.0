
var validator = require('validator');
var Hospital   = require('../app/models/Hospital');
var notify = require('../app/models/Notification');

var Verify={

		verifyCustomer:function(userParam,callback){
			console.log(userParam);
            var username = userParam.username;
			if(validator.isEmail(username)){
                Hospital.findOne({username:new RegExp(username,'i')}).exec()
                .then((userInfo) => {
                    console.log('userInfo,,,',userInfo);
                    if(userInfo === null){
                        callback({response:'0',message:'no user found to verify'});
                    }else if(typeof userInfo !== undefined){

                        if(userParam.otp === userInfo.otp){

                            let at = userParam.attempt_time;
                            let t = at-userInfo.register_time;

                            if(t<=118330.5 && t>=0){

                                Hospital.updateOne({username:username},{$set:{verification_status:true}}).exec()
                                .then((userSuccess) => {
                                    console.log('user success verified..',userSuccess);

                                    if (userParam.from === 'web') {
                            
                                        console.log('logged in from web ...');
                                       
                                        notify.findOne({username: new RegExp(username,'i')}).exec()
                                        .then((notifications) => {
    
                                            console.log('notify info...',notifications);
    
                                            if(notifications === null){
    
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
                                                    console.log(success);
                                                });
                                                
                                            }else if(typeof notifications !== undefined){
                                                let found = false;
                                                notifications.devices.web.map((notifyData,notifyIndex) => {
                                                    if(notifyData.deviceid === userParam.deviceid){
                                                        found = true;
                                                        notify.update(
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
                                                                console.log('updated...',updated);
                                                            })
                                                    }
                                                })
                                                console.log('boolean found...',found);
                                                if(found === false){

                                                    console.log(notifications._id);
                                                    notify.update(
                                                        { _id : notifications._id,username:new RegExp(username,'i')},
                                                        {
                                                            "$push" : {

                                                                "devices.web": {
                                                                    deviceid:userParam.deviceid,
                                                                    deviceToken:userParam.deviceToken,
                                                                    login:true
                                                                }
                                                            }

                                                        }).exec()
                                                        .then((notifyPushed) => {
                                                            console.log('notify pushes...',notifyPushed);
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                        })
                                                }

                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })

                                    }else{
                                        console.log('logged in from mobile device...');
                                        notify.findOne({username: new RegExp(username,'i')}).exec()
                                        .then((notifications) => {
    
                                            console.log('notify info...',notifications);
    
                                            if(notifications === null){
    
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
                                                    console.log(success);
                                                });
                                                
                                            }else if(typeof notifications !== undefined){
                                                let found = false;
                                                notifications.devices.mobile.map((notifyData,notifyIndex) => {
                                                    if(notifyData.deviceid === userParam.deviceid){
                                                        found = true;
                                                        notify.update(
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
                                                                console.log('updated...',updated);
                                                            })
                                                    }
                                                })
                                                console.log('boolean found...',found);
                                                if(found === false){
                                                    console.log(notifications._id);
                                                    notify.update(
                                                        { _id : notifications._id,username:new RegExp(username,'i')},
                                                        {
                                                            "$push" : {

                                                                "devices.mobile": {
                                                                    deviceid:userParam.deviceid,
                                                                    deviceToken:userParam.deviceToken,
                                                                    login:true
                                                                }
                                                            }

                                                        }).exec()
                                                        .then((notifyPushed) => {
                                                            console.log('notify pushes...',notifyPushed);
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                        })
                                                }

                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })
                                    }
                                        var r = {response:'3',message:'Your account has been successfully verified'};
                                        callback(r);

                                })
                                .catch((error)=>{
                                    callback({response:'0',message:error});
                                })
                            
                            }else{
				            	var r1 = {response:'1',message:'Your OTP got expired'};
								callback(r1);
				            }
                        }else{
                            var r2 = {response:'0',message:'Invalid OTP'};
                            callback(r2);
                        }
                    }
                })
            }else{
                console.log('Invalid mail!!');
                callback({response:'0',message:'Invalid email address'});
            }
        }
};

module.exports=Verify;
