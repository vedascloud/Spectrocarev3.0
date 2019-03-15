var contactDB = require('../app/models/feedback');
var nodemailer = require('nodemailer');
var multiline = require('multiline');

var feedbackController = {
    
        takingFeedback : function(userParam,callback) {

            let tokenId = Date.now();

            var str = multiline(function(){/*
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <title>E-mail Template</title>
                        <style>
                   .button {
                    background-color: #4CAF50; 
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    }
                    .button2 {background-color: #008CBA;} 
                    .button3 {background-color: #f44336;} 
                    .button4 {background-color: #e7e7e7; color: black;} 
                    .button5 {background-color: #555555;} 
                    </style>
                    </head>
                        <body style="background-color: #b7a98b; background-image: url(http://54.234.239.245:8096/images/bg-all.jpg); color: #222121; font-family: Times New Roman, Times, serif; font-size: 13px; line-height: 16px; text-align: left;">
                        
                            <table cellspacing="0" border="0" align="center" cellpadding="0" width="100%">
                                <tr>
                                    <td valign="top">
                                        <a name="top" style="text-decoration: none; color: #cc0000;"></a>
                                        <table class="main-body" cellspacing="0" border="0" align="center" style="background-color: #d4c5a2; background-image: url(http://54.234.239.245:8096/images/bg-main.jpg); color: #222121; font-family: Times New Roman, Times, serif; font-size: 13px; line-height: 16px;" cellpadding="0" width="616">
                                            
                                                <tr>
                                                    <td class="main-td" style="padding: 0 25px;">	<!-- introduction and menu box-->
                                                        <table class="intro" cellspacing="0" border="0" style="background-color: #e3ddca; background-image: url(http://54.234.239.245:8096/images/bg-content.jpg); border-bottom: 1px solid #c3b697;" cellpadding="0" width="100%">
                                                            <tr>
                                                                <td valign="top" style="padding: 10px 12px 0px;" colspan="2">
                                                                    <table class="banner" cellspacing="0" border="0" style="background: #550808; color: #fcfbfa; font-family: Times New Roman, Times, serif;" cellpadding="0" width="100%">
                                                                        <tr>
                                                                            <td style="background: #e5ddca;"><img src="http://54.234.239.245:8096/images/spacer.gif" height="2" style="display: block; border: none;" width="452" /></td>
                                                                            <td align="right" style="background: #e5ddca;"><img src="http://54.234.239.245:8096/images/banner-top.png" height="2" style="display: block; border: none;" width="90" /></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="title" valign="top" style="padding: 0 12px 0;">
                                                                                <img src="http://54.234.239.245:8096/images/spacer.gif" width="1" height="35" style="display: block; border: none;">
                                                                                <h1 style="padding: 0; color:#fcfbfa; font-family: Times New Roman, Times, serif; font-size: 60px; line-height: 60px; margin: 0;">Spectrum</h1><br>
                                                                                <p style="padding: 0; color:#fcfbfa; font-family: Times New Roman, Times, serif; font-size: 16px; text-transform: uppercase; margin: 0;"><currentmonthname> E-Mail Verification</p>
                                                                            </td>
                                                                            <td valign="top" align="right" width="90"><img src="http://54.234.239.245:8096/images/banner-middle.gif" height="144" style="display: block; border: none;" width="90" /></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="content" align="left" valign="top" style="font-size: 15px; font-style: italic; line-height: 18px; padding:0 35px 12px 12px; width: 500px;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style=" color: #222121; font-family: Times New Roman, Times, serif; font-size: 20px; line-height: 16px;">
                                                                        <tr>
                                                                            <td style="padding:50px 15px 20px; width = 100%">
                                                                                <p style="padding:0; font-family: Times New Roman, Times, serif;"><strong>Dear %m,</strong></p>
                                                                                <pre style="padding:0; font-family: Times New Roman, Times, serif;">We have received a feed back information which is about Spectrum application. Our representative person will contact you soon.</pre>
                                                                                <pre style="padding:0; font-family: Times New Roman, Times, serif;">Your complaint id has mentioned below.Please share this complain id with our represenatative. So, Please find the below token number.</pre>
                                                                                <button class="button" style="font-size: 20px; ">%s</button>
                                                                                <br>
                                                                                <p style="padding:0; font-family: Times New Roman, Times, serif;">Thanks&Regards,<br>Best Wishes,<br> Spectrum Team </p>
                                                                                
                                                                                <p style="padding:0; font-family: Times New Roman, Times,serif;">Please do not reply to this mail.</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td class="menu" align="left" valign="top" style="width: 178px; padding: 0 12px 0 0;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style=" font-family: Times New Roman, Times, serif; font-size: 13px; line-height: 16px;">
                                                                        <tr>
                                                                            <td valign="top" align="right"><img src="http://54.234.239.245:8096/images/banner-bottom.png" height="55" style="display: block; border: none;" width="178" /></td>
                                                                        </tr>
                                                            
                                                        </table>
                                                    </td>
                                                </tr>
                                                
                                                
                                                <tr>
                                                    <td class="main-td" valign="top" style="padding: 0 25px;">	<!-- contact box -->
                                                        <table class="contact" cellspacing="0" border="0" style="background-color: #ded5c1; background-image: url(http://54.234.239.245:8096/images/bg-content.jpg); border-bottom: 1px solid #c3b697;  color: #222121; font-family: Times New Roman, Times, serif;" cellpadding="0" width="100%">
                                                            <tr>
                                                                <td colspan="3"><img src="http://54.234.239.245:8096/images/spacer.gif" height="17" style="display: block; border: none;" width="1" /></td>
                                                            </tr>
                                                            <tr>
                                                                
                                                                <td class="title" align="left" valign="top" style=" font-family: Times New Roman, Times, serif; background: #ded7c6; padding: 10px 12px; text-transform: uppercase;" width="33%"><strong>contact us</strong></td>
                                                            </tr>
                                                            <tr>
                                                                
                                                                <td class="content" rowspan="2" align="left" valign="top" style=" font-family: Times New Roman, Times, serif; font-size: 12px; padding: 10px 12px;">
                                                                    <p style=" font-family: Times New Roman, Times, serif; margin: 0; padding: 0;">123       Some Street<br />
                                                                        City, State<br />
                                                                        99999<br />
                                                                        (147) 789 7745<br />
                                                                        <a href="#" style="text-decoration: none; color: #cc0000;">www.spectrum.com</a><br />
                                                                        <a href="mailto:info@abcwidgets.com" style="text-decoration: none; color: #cc0000;">info@abcwidgets.com</a></p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                <td class="footer" valign="top" colspan="2"><img src="http://54.234.239.245:8096/images/spacer.gif" height="15" style="display: block; border: none;" width="1" /></td>
                                                            </tr>
                                                            <tr>
                                                    <td class="flourish" valign="top" style="padding: 22px 25px;"><img src="http://54.234.239.245:8096/images/flourish.png" height="35" style="display: block; border: none;" width="566" /></td>
                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                        </body>
                 */ });

                var custom = multiline(function(){/*
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <title>E-mail Template</title>
                        <style>
                   .button {
                    background-color: #4CAF50; 
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    }
                    .button2 {background-color: #008CBA;} 
                    .button3 {background-color: #f44336;} 
                    .button4 {background-color: #e7e7e7; color: black;} 
                    .button5 {background-color: #555555;} 
                    </style>
                    </head>
                        <body style="background-color: #b7a98b; background-image: url(http://54.234.239.245:8096/images/bg-all.jpg); color: #222121; font-family: Times New Roman, Times, serif; font-size: 13px; line-height: 16px; text-align: left;">
                        
                            <table cellspacing="0" border="0" align="center" cellpadding="0" width="100%">
                                <tr>
                                    <td valign="top">
                                        <a name="top" style="text-decoration: none; color: #cc0000;"></a>
                                        <table class="main-body" cellspacing="0" border="0" align="center" style="background-color: #d4c5a2; background-image: url(http://54.234.239.245:8096/images/bg-main.jpg); color: #222121; font-family: Times New Roman, Times, serif; font-size: 13px; line-height: 16px;" cellpadding="0" width="616">
                                            
                                                <tr>
                                                    <td class="main-td" style="padding: 0 25px;">	<!-- introduction and menu box-->
                                                        <table class="intro" cellspacing="0" border="0" style="background-color: #e3ddca; background-image: url(http://54.234.239.245:8096/images/bg-content.jpg); border-bottom: 1px solid #c3b697;" cellpadding="0" width="100%">
                                                            <tr>
                                                                <td valign="top" style="padding: 10px 12px 0px;" colspan="2">
                                                                    <table class="banner" cellspacing="0" border="0" style="background: #550808; color: #fcfbfa; font-family: Times New Roman, Times, serif;" cellpadding="0" width="100%">
                                                                        <tr>
                                                                            <td style="background: #e5ddca;"><img src="http://54.234.239.245:8096/images/spacer.gif" height="2" style="display: block; border: none;" width="452" /></td>
                                                                            <td align="right" style="background: #e5ddca;"><img src="http://54.234.239.245:8096/images/banner-top.png" height="2" style="display: block; border: none;" width="90" /></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="title" valign="top" style="padding: 0 12px 0;">
                                                                                <img src="http://54.234.239.245:8096/images/spacer.gif" width="1" height="35" style="display: block; border: none;">
                                                                                <h1 style="padding: 0; color:#fcfbfa; font-family: Times New Roman, Times, serif; font-size: 60px; line-height: 60px; margin: 0;">Spectrum</h1><br>
                                                                                <p style="padding: 0; color:#fcfbfa; font-family: Times New Roman, Times, serif; font-size: 16px; text-transform: uppercase; margin: 0;"><currentmonthname> E-Mail Verification</p>
                                                                            </td>
                                                                            <td valign="top" align="right" width="90"><img src="http://54.234.239.245:8096/images/banner-middle.gif" height="144" style="display: block; border: none;" width="90" /></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="content" align="left" valign="top" style="font-size: 15px; font-style: italic; line-height: 18px; padding:0 35px 12px 12px; width: 500px;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style=" color: #222121; font-family: Times New Roman, Times, serif; font-size: 20px; line-height: 16px;">
                                                                        <tr>
                                                                            <td style="padding:50px 15px 20px; width = 100%">
                                                                                <p style="padding:0; font-family: Times New Roman, Times, serif;"><strong>Dear admin,</strong></p>
                                                                                <pre style="padding:0; font-family: Times New Roman, Times, serif;">We have received a feed back information which is about Spectrochip application. From the user %x</pre>
                                                                                <pre style="padding:0; font-family: Times New Roman, Times, serif;">%y</pre>
                                                                                
                                                                                <br>
                                                                                <p style="padding:0; font-family: Times New Roman, Times, serif;">Thanks&Regards,<br>Best Wishes,<br> Spectrum Team </p>
                                                                                
                                                                                <p style="padding:0; font-family: Times New Roman, Times,serif;">Please do not reply to this mail.</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                                <td class="menu" align="left" valign="top" style="width: 178px; padding: 0 12px 0 0;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style=" font-family: Times New Roman, Times, serif; font-size: 13px; line-height: 16px;">
                                                                        <tr>
                                                                            <td valign="top" align="right"><img src="http://54.234.239.245:8096/images/banner-bottom.png" height="55" style="display: block; border: none;" width="178" /></td>
                                                                        </tr>
                                                            
                                                        </table>
                                                    </td>
                                                </tr>
                                                
                                                
                                                <tr>
                                                    <td class="main-td" valign="top" style="padding: 0 25px;">	<!-- contact box -->
                                                        <table class="contact" cellspacing="0" border="0" style="background-color: #ded5c1; background-image: url(http://54.234.239.245:8096/images/bg-content.jpg); border-bottom: 1px solid #c3b697;  color: #222121; font-family: Times New Roman, Times, serif;" cellpadding="0" width="100%">
                                                            <tr>
                                                                <td colspan="3"><img src="http://54.234.239.245:8096/images/spacer.gif" height="17" style="display: block; border: none;" width="1" /></td>
                                                            </tr>
                                                            <tr>
                                                                
                                                                <td class="title" align="left" valign="top" style=" font-family: Times New Roman, Times, serif; background: #ded7c6; padding: 10px 12px; text-transform: uppercase;" width="33%"><strong>contact us</strong></td>
                                                            </tr>
                                                            <tr>
                                                                
                                                                <td class="content" rowspan="2" align="left" valign="top" style=" font-family: Times New Roman, Times, serif; font-size: 12px; padding: 10px 12px;">
                                                                    <p style=" font-family: Times New Roman, Times, serif; margin: 0; padding: 0;">123       Some Street<br />
                                                                        City, State<br />
                                                                        99999<br />
                                                                        (147) 789 7745<br />
                                                                        <a href="#" style="text-decoration: none; color: #cc0000;">www.spectrum.com</a><br />
                                                                        <a href="mailto:info@abcwidgets.com" style="text-decoration: none; color: #cc0000;">info@abcwidgets.com</a></p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                <td class="footer" valign="top" colspan="2"><img src="http://54.234.239.245:8096/images/spacer.gif" height="15" style="display: block; border: none;" width="1" /></td>
                                                            </tr>
                                                            <tr>
                                                    <td class="flourish" valign="top" style="padding: 22px 25px;"><img src="http://54.234.239.245:8096/images/flourish.png" height="35" style="display: block; border: none;" width="566" /></td>
                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                        </body>
                 */ });
                 
                var customer = custom.replace("%x",userParam.username);
                var customer2 = customer.replace("%y",userParam.feedback);

                var html = str.replace("%s", tokenId);
                var html1 = html.replace("%m",userParam.username);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'contact.spectrum.in@gmail.com',
                        pass: 'vedas2017'
                    }
                });

                  var mOpt2 = {
                      from: 'contact.spectrum.in@gmail.com',
                      to: 'service@spectrochips.com', //service@spectrochips.com
                      subject: 'FeedBack from the user',
                      html: customer2
                  };

              var mailOptions = {
                  from: 'contact.spectrum.in@gmail.com',
                  to: userParam.EMail,
                  subject: 'FeedBack',
                  html: html1
              };

              transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                    //res(error);
                  } else {
                    console.log('Email sent: ' + info.response);

                  }
              });

              transporter.sendMail(mOpt2, function(error, info){
                  if (error) {
                    console.log(error);
                    //res(error);
                  } else {
                    console.log('Email sent: ' + info.response);

                  }
              });
              
            contactDB.findOne({username: new RegExp(userParam.username,'i')}).exec()
            .then((userFound) => {
                
                if(userFound){
    
                    contactDB.updateOne({username: new RegExp(userParam.username,'i')},{$push:{
                        "feedbackDetails":{
                            mail:userParam.EMail,
                            name:userParam.name,
                            feedback:userParam.feedback,
                            token_id:tokenId
                        }
                    }}).then((feedbackUpdated) => {
                        console.log('feedback status..',feedbackUpdated);
                        if(feedbackUpdated){
                            callback({response:'3',message:'your feed back has taken successfully. We will contact you soon.'});
                        }else{
                            callback({response:'0',message:'Someting gone wrong!!!'});
                      
                        }
                    }).catch((error) => {
                        throw error;
                    })
                }
                //else{
                    var saveFunction = new contactDB({
                        username:userParam.username,
                        mail:userParam.EMail,
                        name:userParam.name,
                        feedback:userParam.feedback,
                        token_id:tokenId
                    })

                    saveFunction.save((success) => {
                        console.log(success);
                        if(success){
                            callback({response:'3',message:'your feed back has taken successfully. We will contact you soon.'});

                        }else{
                            callback({response:'0',message:'Something gone wrong'});
                      
                        }
                    });
                //}
            })

        }

}
module.exports = feedbackController;