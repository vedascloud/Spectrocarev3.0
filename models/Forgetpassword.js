var Hospital   = require('../app/models/Hospital');
var multiline = require('multiline');
var nodemailer = require('nodemailer');
var validator = require('validator');

var Forgot={

		forgot:function(userParam,callback){
            let username = userParam.username;
			 if (validator.isEmail(username)){

                Hospital.findOne({username:new RegExp(username,'i')}).exec()
                .then((userFound) => {
                    console.log('userfound...',userFound);
                    if(userFound){
                         let pin = "";
						 var possible = "0123456789";

						  for (var i1 = 0; i1 < 4; i1++){
						    pin += possible.charAt(Math.floor(Math.random() * possible.length));
						    }
                    console.log('pin:'+pin);
                    var str = multiline(function(){/*
				    	
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SpectroChips</title>
    <style>

    </style>



</head>

<body>
<div width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="table-layout: fixed; margin: 0 auto; max-width: 700px;background-color: white;box-shadow: 0 0 15px #2a2a2a; padding: 15px">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="font-family:Arial;table-layout: fixed; margin: 0 auto; max-width: 700px;background-color: white;">
        <tr>
            <td style="width: 40%">
                <img src="http://54.210.61.0:8096/logos/Logo.png" width="70%"  style="margin-top: 5%; margin-left: 12%;">
            </td>
            <td style="margin-top: 6%;text-align: center; padding: 0; width: 60%">
                <a href="http://www.spectrochips.com" style="color: #9e9e9e; font-family: sans-serif; font-size: 12px; border-bottom: 1px solid #909C99"><b>Home</b></a>&nbsp;&nbsp;
                <a href="http://www.spectrochips.com" style="color: #9e9e9e; font-family: sans-serif;font-size: 12px; border-bottom: 1px solid #909C99"><b>Products</b></a>&nbsp;&nbsp;
                <a href="http://www.spectrochips.com" style="color: #9e9e9e; font-family: sans-serif;font-size: 12px; border-bottom: 1px solid #909C99"><b>Contact</b></a></td>
        </tr>
    </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="font-faily:Arial; table-layout: fixed;background-position: center; min-width: 100%; background-color: #ffffff; background-size: cover; padding: 200px 0 40px 0;margin-top: 10px" background="http://54.210.61.0:8096/logos/img1.png">

                <tr>
                    <td>
                        <div style="margin-top: 100px; text-align: center"><h2 style="font-family: sans-serif">
                           OTP VERIFICATION</h2></div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <p style="margin-left: 10%; font-family: Georgia; font-size: 15px" class="font">Hi %m,<br></p>
                    </td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                    <td>
                        <p style="margin-left: 10%;font-family: Georgia; font-size: 15px; text-justify: auto" class="font">You'r  almost ready to start enjoying our services.<br>
                            Simply use the verfication code below to verify your email address.</p>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;&nbsp;</td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                    <td style="text-align: center">
                    <span style="padding: 12px 30px 12px 30px; background-color: #FFA911;color: white;font-family: sans-serif; font-size: 20px">
                        %s
                    </span>
                    </td>
                </tr>
                <tr>
                    <td><br><br><br></td>
                </tr>
            </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="font-family:Arial;table-layout: fixed; margin: 0 auto; max-width: 700px;background-color: white;">
        <tr>
            <td>
                <p style="font-family: 'segoe print';font-size: 18px; text-align: center">
                    Stay in touch
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="font-family: 'Comic Sans MS'; text-align: center">
                    <img src="http://54.210.61.0:8096/logos/ic_twitter.png" alt="Twitter"/>
                    <img src="http://54.210.61.0:8096/logos/ic_fb.png" alt="Facebook"/>
                    <img src="http://54.210.61.0:8096/logos/ic_in.png" alt="In"/>
                </p>
            </td>
        </tr>
        <tr><td>
            <p style="text-align: center">
                <span style="font-size: small">copy &copy; 2019</span><br>
                www.spectrochips.com<br>
                <span style="border-bottom: 2px solid #00ffff">All rights reserved</span>

            </p>
        </td></tr>
    </table>

</div>
</body>
</html>
                         */ });
                         var html = str.replace("%s", pin);
                         var html1 = html.replace("%m",username);

                         var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'contact.spectrum.in@gmail.com',
                                pass: 'vedas2017'
                            }
                          });
                         var mailOptions = {
                              from: 'contact.spectrum.in@gmail.com',
                              to: username,
                              subject: 'Forgot password OTP verification',
                              html: html1
                        };
        
                        transporter.sendMail(mailOptions, (info) => {

                            console.log('Email sent: ' + info.response);
                          
                          });

                          Hospital.updateOne({username:new RegExp(username,'i')},{$set:{otp:pin,register_time: userParam.register_time}}).exec()
                          .then((otpUpdated) => {
                              console.log('otp updated...',otpUpdated);
                              if(otpUpdated){
                                callback({response:'3',message:'Please verify your account'});
                              }else{
                                callback({response:'0',message:'Something went wrong'});
                              }
                          })
 
                    }else{
                        callback({response:'0',message:'you dont have account please register'});
                    }
                })
				
				 
			}else{
				console.log('please pass correct email address');
				callback({response:'0',message:'we have not yet provide the option to use mobile number.'});
			}
			}
		
};

module.exports=Forgot;

		