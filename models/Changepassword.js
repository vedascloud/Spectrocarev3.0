var Hospital   = require('../app/models/Hospital');
var validator = require('validator');

var Changepassword={

		setpassword:function(userParam,callback){
			var username = userParam.username;
			if(validator.isEmail(username)){
				Hospital.findOne({username:new RegExp(username,'i'),password:userParam.Currentpassword,verification_status:true}).exec()
				.then((userStatus) => {
					console.log('userStatus..',userStatus);
					if(userStatus){
						if(userStatus.password === userParam.Newpassword){

							callback({response:'4',message:'You have already set this password, please enter a different password'});
					    	
						}else{
							Hospital.updateOne({username:new RegExp(username,'i')},{$set:{password:userParam.Newpassword}}).exec()
							.then((passUpdated) => {
							if(passUpdated){

								callback({response:'3',message:'The new password has been changed successfully, please login again'});
	 	       						
							}
						})
					}

					}else{

						callback({response:'0',message:'You are not a valid user to set password'});
			
					}
				})
			}else{

				callback({response:'0',message:'Pass a valid email address'});
			
			}
		}
		
};

module.exports=Changepassword;
		