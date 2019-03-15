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
				    	
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
        <style>
            * {
                font-family: sans-serif !important;
            }
        </style>
    <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
    <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

    <!-- CSS Reset : BEGIN -->
    <style>

        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

     
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

       
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }
        table table table {
            table-layout: auto;
        }

       
        img {
            -ms-interpolation-mode:bicubic;
        }

       
        a {
            text-decoration: none;
        }

     
        *[x-apple-data-detectors],  
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

       
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

     
        .im {
            color: inherit !important;
        }

       
        img.g-img + div {
            display: none !important;
        }

       
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }
      
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }
       
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }

    </style>
    <!-- CSS Reset : END -->
	<!-- Reset list spacing because Outlook ignores much of our inline CSS. -->
	<!--[if mso]>
	<style type="text/css">
		ul,
		ol {
			margin: 0 !important;
		}
		li {
			margin-left: 30px !important;
		}
		li.list-item-first {
			margin-top: 0 !important;
		}
		li.list-item-last {
			margin-bottom: 10px !important;
		}
	</style>
	<![endif]-->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

	    .button-td,
	    .button-a {
	        transition: all 100ms ease-in;
	    }
	    .button-td-primary:hover,
	    .button-a-primary:hover {
	        background: #555555 !important;
	        border-color: #555555 !important;
	    }

	    @media screen and (max-width: 600px) {

	        .email-container p {
	            font-size: 17px !important;
	        }

	    }

    </style>
    <!-- Progressive Enhancements : END -->

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

</head>
<!--
	The email background color (#222222) is defined in three places:
	1. body tag: for most email clients
	2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
	3. mso conditional: For Windows 10 Mail
-->
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #EDF4F0;">
	<center style="width: 100%; background-color: #EDF4F0;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
    <tr>
    <td>
    <![endif]-->

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            (Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
        <!-- Preview Text Spacing Hack : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
	        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <!-- Preview Text Spacing Hack : END -->

        <!--
            Set the email width. Defined in two places:
            1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.
            2. MSO tags for Desktop Windows Outlook enforce a 600px width.
        -->
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!--[if mso]>
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
            <tr>
            <td>
            <![endif]-->

	        <!-- Email Body : BEGIN -->
	        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 auto;">
		        <!-- Email Header : BEGIN -->
	            <tr>
	                <td style="padding: 20px 0; text-align: center">
                    
	                  <!--  <img src="https://via.placeholder.com/200x50" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;"> -->
                        
	                </td>
	            </tr>
		        <!-- Email Header : END -->

                <!-- Hero Image, Flush : BEGIN -->
                <tr>
                    
                </tr>
                <!-- Hero Image, Flush : END -->

                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                    <h1 style="margin: 10px 0 20px 0; font-family: sans-serif; font-size: 25px; line-height: 30px; color: #333333; font-weight: normal;">Dear %m &nbsp;</h1>
                                    <p style="margin: 0 10px; font-size: 20px; line-height: 30px;">  We received a request that you forgot your password of Your Spectrocare account.Use this One Time Password (OTP) toreset your password.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px;">
                                    <!-- Button : BEGIN -->
                                    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: auto;">
                                        <tr>
                                            <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
											     <a class="button-a button-a-primary" href="https://google.com/" style="background: #05025E; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">%s</a>
											</td>
                                        </tr>
                                    </table>
                                    <!-- Button : END -->
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 30px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #4B97F8;">
                                    <h2 style="margin: 0 0 0 0; font-family: sans-serif; font-size: 15px; line-height: 22px; color: #FC564E; font-weight: bold;">Note : If You Didn't mean to Reset your Password ,then you can just ignore this Your Password will not change</h2>
                                </td>
                            </tr>
                        </table>
                         <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 auto;">
                <tr>
                    <td style="padding: 20px; font-family: sans-serif; font-size: 12px; line-height: 15px; text-align: center; color: #555555;">
                        <br><br>
						Spectrocare<br><span class="unstyle-auto-detected-links">No.951, Fuxing Rd., Zhubei City,<br>Hsinchu County 302, Taiwan (R.O.C.)</span>
                        <br><br>
                       
                    </td>
                </tr>
            </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->

                <!-- 2 Even Columns : BEGIN -->
                <tr>
                    <td height="100%" valign="top" width="100%" style="padding: 0 10px 40px 10px; background-color: #ffffff;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">
                            <tr>
                                <td valign="top" width="50%">
                                   
                                </td>
                                <td valign="top" width="50%">
                                    
                                        
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- Two Even Columns : END -->

                <!-- Clear Spacer : BEGIN -->
                <tr>
                    <td aria-hidden="true" height="40" style="font-size: 0px; line-height: 0px;">
                        &nbsp;
                    </td>
                </tr>
                <!-- Clear Spacer : END -->

                <!-- 1 Column Text : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                       <!-- <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text : END 

            </table> -->
            <!-- Email Body : END -->

            <!-- Email Footer : BEGIN -->
	       
            <!-- Email Footer : END -->

            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </div>

        <!-- Full Bleed Background Section : BEGIN -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #709f2b;">
            <tr>
                <td valign="top">
                    <div align="center" style="max-width: 600px; margin: auto;" class="email-container">
                        <!--[if mso]>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
                        <tr>
                        <td>
                        <![endif]-->
                        
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div>
                </td>
            </tr>
        </table>
        <!-- Full Bleed Background Section : END -->

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
    </center>
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

		