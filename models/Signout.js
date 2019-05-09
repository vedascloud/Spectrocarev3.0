var Hospital   = require('../app/models/Hospital');
var clientDB = require('../app/models/Notification');
var validator = require('validator');

var Logout={

    sessionout:function (userParam,callback) {

        console.log('username...',userParam.username);
        console.log('deviceId...',userParam.deviceid);
        console.log('deviceToken...',userParam.deviceToken);

        var username = userParam.username;
        if(validator.isEmail(username)){
            if(userParam.from === 'web'){
                clientDB.updateMany({
                        'username':new RegExp(username,'i'),
                        'devices.web.deviceid':userParam.deviceid,
                        'devices.web.deviceToken':userParam.deviceToken
                    },
                    {
                        '$set' :
                            {

                                'devices.web.$.login':false
                            }
                    }).exec()
                    .then((updated) => {
                        if(updated){
                            callback({response:'3',message:'You have been successfully logged out'});  
                        }else{
                            callback({response:'0',message:'something went wrong'});
                        }
                    })

            }else{
            
                clientDB.updateMany({
                        'username':new RegExp(username,'i'),
                        'devices.mobile.deviceid':userParam.deviceid,
                        'devices.mobile.deviceToken':userParam.deviceToken
                    },
                    {
                        '$set' :
                            {

                                'devices.mobile.$.login':false
                            }
                    }).then((updated) => {
                        if(updated){
                            callback({response:'3',message:'You have been successfully logged out'});  
                        }else{
                            callback({response:'0',message:'Something gone wrong'});
                        }
                    })

            }

        }else{
            console.log('Invalid mail!!');
            callback({response:'0',message:'please pass a valid email address'});
        }

    }

};

module.exports=Logout;