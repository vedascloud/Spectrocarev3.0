var DoctorDB   = require('../app/models/doctor');
var HospitalDB = require('../app/models/Hospital');
var notify = require('../app/models/Notification');
var validator = require('validator');
var nodemailer = require('nodemailer');
var jwt    = require('jsonwebtoken');
var User = require('../app/models/user');
var multiline = require('multiline');
const apn = require('apn');
var FCM = require('fcm-push');
var admin = require('firebase-admin');

var serviceAccount = require('../app/configfiles/spectrocare-55461-firebase-adminsdk-q6fks-50fd2e8672.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spectrocare-55461.firebaseio.com"
});


var rand,mailOptions,host,link,link2;

var hpspitalController={

    addHospital:function(userParam,callback){
        var username = userParam.email;
        if(validator.isEmail(username)){

                HospitalDB.findOne({email:new RegExp(username,'i')}).exec()
                    .then((hospitalFound) => {
                    console.log('doctor found...',hospitalFound);
                if(hospitalFound){

                    if(userParam.found === 'found'){

                        //link="http://"+"54.210.61.0"+"/spectrocare/doctor?token="+token;  //54.234.239.245
                        //link2 = "http://"+"54.210.61.0"+"/spectrocare/doctor?token="+token+"&type=rejected";

                        var str = multiline(function () {/*
                 <html>
   <head>
      <style>
         .banner-color {
         background-color: #eb681f;
         }
         .title-color {
         color: #0066cc;
         }
         .button-color {
         background-color: #0066cc;
         }
         @media screen and (min-width: 500px) {
         .banner-color {
         background-color: #0066cc;
         }
         .title-color {
         color: #eb681f;
         }
         .button-color {
         background-color: #eb681f;
         }
         }
      </style>
   </head>
   <body>
      <div style="background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important">
         <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
            <tbody>
               <tr>
                  <td align="center">
                     <center style="width:100%">
                        <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512">
                           <tbody>
                              <tr>
                                 <td bgcolor="#F3F3F3" width="100%" style="background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec">
                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%">
                                       <tbody>
                                          <tr>
                                             <td align="left" valign="middle" width="50%"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">Spectrum</span></td>
                                             <td valign="middle" width="50%" align="right" style="padding:0 0 0 10px"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px"></span></td>
                                             <td width="1">&nbsp;</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                              <tr>
                                 <td align="left">
                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                       <tbody>
                                          <tr>
                                             <td width="100%">
                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                   <tbody>
                                                      <tr>
                                                         <td align="center" bgcolor="#8BC34A" style="padding:20px 48px;color:#ffffff" class="banner-color">
                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                               <tbody>
                                                                  <tr>
                                                                     <td align="center" width="100%">
                                                                        <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px">Invitation from Spectrum</h1>
                                                                     </td>
                                                                  </tr>
                                                               </tbody>
                                                            </table>
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                         <td align="center" style="padding:20px 0 10px 0">
                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                               <tbody>
                                                                  <tr>
                                                                     <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;">
                                                                        <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;" class="title-color">Hi,</h3>
                                                                        <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;">This user %a is trying to add you as a family doctor of them. , so if you are wishing to add as his consultant doctor please click on the below link <b><a href=%b>click here to accept</a></b><br><br>If you want to reject the invitation.Please click on the below link.<br><b><a href=%c>click here to reject</a></b></p>
                                                                        <br>
                                                                        <br>
                                                                  </tr>
                                                               </tbody>
                                                            </table>
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                      </tr>
                                                      <tr>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                              <tr>
                                 <td align="left">
                                    <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                       <tbody>
                                          <tr>
                                             <td align="center" width="100%">
                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                   <tbody>
                                                      <tr>
                                                         <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">Regards,
                                                            <br><b> Spectrum  Team</b>
                                                         </td>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td align="center" width="100%">
                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                   <tbody>
                                                      <tr>
                                                         <td align="center" style="padding:0 0 8px 0" width="100%"></td>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </center>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </body>
</html>
                */});

                        var html = str.replace("%a",username);
                       // var html1 = html.replace("%b",link);
                        //var html2 = html1.replace("%c",link2);
                        var smtpTransport = nodemailer.createTransport({
                            service: "Gmail",
                            auth: {
                                user: "contact.spectrum.in@gmail.com",
                                pass: "vedas2017"
                            }
                        });
                        mailOptions={
                            to : userParam.email,
                            subject : "Please confirm your invitation",
                            html : html2
                        }
                        if(userParam.email === hospitalFound.email){
                            console.log('no need to send email to hospital');
                        }else{

                            smtpTransport.sendMail(mailOptions, function(error, response){
                                if(error){
                                    console.log(error);

                                }else{
                                    console.log("Message sent: " + response.message);

                                }

                            });
                        }

                        HospitalDB.updateOne({username:new RegExp(username,'i')},{$set:{name:userParam.name,
                            email:userParam.email,
                            telephone:userParam.telephone,
                            fax:userParam.fax,
                            contactPerson:userParam.contactPerson,
                            address:userParam.address,
                            location:[{
                            currentLocation:[userParam.latitude,userParam.longitude],
                            pickLocation:[userParam.latitude,userParam.longitude]
                            }]
                        }}).exec()
                            .then((doctorUpdate) => {
                            if(doctorUpdate){
                                var r = {response:'3',doc_id:doctorFound.doc_id,message:'Your doctor details has been successfully stored.'};
                                callback(r);
                            }
                        }).catch((error) => {
                            throw error;
                    })

                    }else{
                        link="http://"+"54.210.61.0"+"/spectrocare/doctor?token="+token;  //54.234.239.245
                        link2 = "http://"+"54.210.61.0"+"/spectrocare/doctor?token="+token+"&type=rejected";

                        var str = multiline(function () {/*
                                     <html>
                       <head>
                          <style>
                             .banner-color {
                             background-color: #eb681f;
                             }
                             .title-color {
                             color: #0066cc;
                             }
                             .button-color {
                             background-color: #0066cc;
                             }
                             @media screen and (min-width: 500px) {
                             .banner-color {
                             background-color: #0066cc;
                             }
                             .title-color {
                             color: #eb681f;
                             }
                             .button-color {
                             background-color: #eb681f;
                             }
                             }
                          </style>
                       </head>
                       <body>
                          <div style="background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important">
                             <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                <tbody>
                                   <tr>
                                      <td align="center">
                                         <center style="width:100%">
                                            <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512">
                                               <tbody>
                                                  <tr>
                                                     <td bgcolor="#F3F3F3" width="100%" style="background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec">
                                                        <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%">
                                                           <tbody>
                                                              <tr>
                                                                 <td align="left" valign="middle" width="50%"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">Spectrum</span></td>
                                                                 <td valign="middle" width="50%" align="right" style="padding:0 0 0 10px"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px"></span></td>
                                                                 <td width="1">&nbsp;</td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                     </td>
                                                  </tr>
                                                  <tr>
                                                     <td align="left">
                                                        <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                           <tbody>
                                                              <tr>
                                                                 <td width="100%">
                                                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                       <tbody>
                                                                          <tr>
                                                                             <td align="center" bgcolor="#8BC34A" style="padding:20px 48px;color:#ffffff" class="banner-color">
                                                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                   <tbody>
                                                                                      <tr>
                                                                                         <td align="center" width="100%">
                                                                                            <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px">Invitation from Spectrum</h1>
                                                                                         </td>
                                                                                      </tr>
                                                                                   </tbody>
                                                                                </table>
                                                                             </td>
                                                                          </tr>
                                                                          <tr>
                                                                             <td align="center" style="padding:20px 0 10px 0">
                                                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                   <tbody>
                                                                                      <tr>
                                                                                         <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;">
                                                                                            <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;" class="title-color">Hi,</h3>
                                                                                            <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;">This user %a is trying to add you as a family doctor of them. , so if you are wishing to add as his consultant doctor please click on the below link <b><a href=%b>click here to accept</a></b><br><br>If you want to reject the invitation.Please click on the below link.<br><b><a href=%c>click here to reject</a></b></p>
                                                                                            <br>
                                                                                            <br>
                                                                                      </tr>
                                                                                   </tbody>
                                                                                </table>
                                                                             </td>
                                                                          </tr>
                                                                          <tr>
                                                                          </tr>
                                                                          <tr>
                                                                          </tr>
                                                                       </tbody>
                                                                    </table>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                     </td>
                                                  </tr>
                                                  <tr>
                                                     <td align="left">
                                                        <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                           <tbody>
                                                              <tr>
                                                                 <td align="center" width="100%">
                                                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                       <tbody>
                                                                          <tr>
                                                                             <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">Regards,
                                                                                <br><b> Spectrum  Team</b>
                                                                             </td>
                                                                          </tr>
                                                                       </tbody>
                                                                    </table>
                                                                 </td>
                                                              </tr>
                                                              <tr>
                                                                 <td align="center" width="100%">
                                                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                       <tbody>
                                                                          <tr>
                                                                             <td align="center" style="padding:0 0 8px 0" width="100%"></td>
                                                                          </tr>
                                                                       </tbody>
                                                                    </table>
                                                                 </td>
                                                              </tr>
                                                           </tbody>
                                                        </table>
                                                     </td>
                                                  </tr>
                                               </tbody>
                                            </table>
                                         </center>
                                      </td>
                                   </tr>
                                </tbody>
                             </table>
                          </div>
                       </body>
                    </html>
                                    */});
                        var html = str.replace("%a",username);
                        var html1 = html.replace("%b",link);
                        var html2 = html1.replace("%c",link2);
                        var smtpTransport = nodemailer.createTransport({
                            service: "Gmail",
                            auth: {
                                user: "contact.spectrum.in@gmail.com",
                                pass: "vedas2017"
                            }
                        });
                        mailOptions={
                            to : userParam.email,
                            subject : "Please confirm your invitation",
                            html : html2
                        }
                        if(userParam.email === doctorFound.email){
                            console.log('no need to send a email here');
                        }else{
                            smtpTransport.sendMail(mailOptions, function(error, response){
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log("Message sent: " + response.message);
                                }
                            });
                        }
                        DoctorDB.updateOne({username:new RegExp(username,'i')},{$set:{name:userParam.name,
                            email:userParam.email,
                            phone:userParam.phone,
                            specalization:userParam.specalization,
                            address:userParam.address,
                            addedtime:userParam.addedtime,
                            loc:[userParam.latitude,userParam.longitude],
                            invitation:'pending',
                            found:userParam.found}}).exec()
                            .then((doctorUpdated) => {
                            console.log('doctor updated...',doctorUpdated);
                        if(doctorUpdated){
                            HospitalDB.update({email:userParam.email},

                                {name:userParam.name,
                                    email:userParam.email,
                                    phone:userParam.phone,
                                    specialization:userParam.specalization,
                                    address:userParam.address,
                                    loc:[userParam.latitude,userParam.longitude]
                                },{ upsert: true }).exec()
                                .then((updatedHospital) => {
                                if(updatedHospital){
                                    console.log('Successfully inserted!!');
                                    var r = {response:'3',doc_id:doctorFound.doc_id,message:'Your doctor details has been successfully stored.'};
                                    callback(r);
                                }
                            })
                        .catch((error) => {
                                throw error;
                        })

                        }
                    })
                    .catch((error) => {
                            throw error;
                    })
                    }

                }else{

                    //link="http://"+"54.210.61.0"+"/spectrocare/doctor?token="+token;  //54.234.239.245
                    //link2 = "http://"+"54.210.61.0"+"/spectrocare/doctor?token="+token+"&type=rejected";

                    var str = multiline(function () {/*
                                 <html>
                   <head>
                      <style>
                         .banner-color {
                         background-color: #eb681f;
                         }
                         .title-color {
                         color: #0066cc;
                         }
                         .button-color {
                         background-color: #0066cc;
                         }
                         @media screen and (min-width: 500px) {
                         .banner-color {
                         background-color: #0066cc;
                         }
                         .title-color {
                         color: #eb681f;
                         }
                         .button-color {
                         background-color: #eb681f;
                         }
                         }
                      </style>
                   </head>
                   <body>
                      <div style="background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important">
                         <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                            <tbody>
                               <tr>
                                  <td align="center">
                                     <center style="width:100%">
                                        <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512">
                                           <tbody>
                                              <tr>
                                                 <td bgcolor="#F3F3F3" width="100%" style="background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec">
                                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%">
                                                       <tbody>
                                                          <tr>
                                                             <td align="left" valign="middle" width="50%"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">Spectrum</span></td>
                                                             <td valign="middle" width="50%" align="right" style="padding:0 0 0 10px"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px"></span></td>
                                                             <td width="1">&nbsp;</td>
                                                          </tr>
                                                       </tbody>
                                                    </table>
                                                 </td>
                                              </tr>
                                              <tr>
                                                 <td align="left">
                                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                       <tbody>
                                                          <tr>
                                                             <td width="100%">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                   <tbody>
                                                                      <tr>
                                                                         <td align="center" bgcolor="#8BC34A" style="padding:20px 48px;color:#ffffff" class="banner-color">
                                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                               <tbody>
                                                                                  <tr>
                                                                                     <td align="center" width="100%">
                                                                                        <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px">Invitation from Spectrum</h1>
                                                                                     </td>
                                                                                  </tr>
                                                                               </tbody>
                                                                            </table>
                                                                         </td>
                                                                      </tr>
                                                                      <tr>
                                                                         <td align="center" style="padding:20px 0 10px 0">
                                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                               <tbody>
                                                                                  <tr>
                                                                                     <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;">
                                                                                        <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;" class="title-color">Hi,</h3>
                                                                                        <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;">This user %a is trying to add you as a family doctor of them. , so if you are wishing to add as his consultant doctor please click on the below link <b><a href=%b>click here to accept</a></b><br><br>If you want to reject the invitation.Please click on the below link.<br><b><a href=%c>click here to reject</a></b></p>
                                                                                        <br>
                                                                                        <br>
                                                                                  </tr>
                                                                               </tbody>
                                                                            </table>
                                                                         </td>
                                                                      </tr>
                                                                      <tr>
                                                                      </tr>
                                                                      <tr>
                                                                      </tr>
                                                                   </tbody>
                                                                </table>
                                                             </td>
                                                          </tr>
                                                       </tbody>
                                                    </table>
                                                 </td>
                                              </tr>
                                              <tr>
                                                 <td align="left">
                                                    <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                       <tbody>
                                                          <tr>
                                                             <td align="center" width="100%">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                   <tbody>
                                                                      <tr>
                                                                         <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">Regards,
                                                                            <br><b> Spectrum  Team</b>
                                                                         </td>
                                                                      </tr>
                                                                   </tbody>
                                                                </table>
                                                             </td>
                                                          </tr>
                                                          <tr>
                                                             <td align="center" width="100%">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                   <tbody>
                                                                      <tr>
                                                                         <td align="center" style="padding:0 0 8px 0" width="100%"></td>
                                                                      </tr>
                                                                   </tbody>
                                                                </table>
                                                             </td>
                                                          </tr>
                                                       </tbody>
                                                    </table>
                                                 </td>
                                              </tr>
                                           </tbody>
                                        </table>
                                     </center>
                                  </td>
                               </tr>
                            </tbody>
                         </table>
                      </div>
                   </body>
                </html>
                                */});
                    var html = str.replace("%a",username);
                    //var html1 = html.replace("%b",link);
                    //var html2 = html1.replace("%c",link2);
                    var smtpTransport = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "contact.spectrum.in@gmail.com",
                            pass: "vedas2017"
                        }
                    });
                    mailOptions={
                        to : userParam.email,
                        subject : "Please confirm your invitation",
                        html : html2
                    }
                    /*if(userParam.email === doctorFound.email){
                        console.log('no need to send just update it..');
                    }else{*/
                    smtpTransport.sendMail(mailOptions, function(error, response){
                        if(error){
                            console.log(error);

                        }else{
                            console.log("Message sent: " + response.message);
                        }

                    });


                    if(userParam.found === 'found'){
                        var hospId = Date.now();
                        var hospitalSave = new HospitalDB({

                            email:userParam.email,
                            telephone:userParam.telephone,
                            fax:userParam.fax,
                            contactPerson:userParam.contactPerson,
                            address:userParam.address,
                            location:[{
                                currentLocation:[userParam.latitude,userParam.longitude],
                                pickLocation:[userParam.latitude,userParam.longitude]
                            }],
                            hospId:hospId.toString()
                        });
                        hospitalSave.save((err,success) => {
                            if(err){
                                callback({response:'0',message:'Something gone wrong'});
                            }else{
                                console.log(success);
                        callback({response:'3',doc_id:hospId.toString(),message:'Your hospital details has been successfully stored.'});

                    }
                    });
                    }else{
                        var docId = Date.now();
                        var doctorSave = new DoctorDB({
                            username:username,
                            name:userParam.username,
                            email:userParam.email,
                            phone:userParam.phone,
                            specalization:userParam.specalization,
                            address:userParam.address,
                            addedtime:userParam.addedtime,
                            loc:[userParam.latitude,userParam.longitude],
                            found:userParam.found,
                            doc_id:docId.toString()
                        });
                        doctorSave.save((success) => {
                            if(success){
                                var hospitalDB = new HospitalDB({
                                    email:userParam.email,
                                    name:userParam.name,
                                    email:userParam.email,
                                    phone:userParam.phone,
                                    specialization:userParam.specalization,
                                    address:userParam.address,
                                    loc:[userParam.latitude,userParam.longitude]
                                });
                                hospitalDB.save((success) => {
                                    if(success){
                                        console.log('hospital updated');
                                    }
                                })
                                callback({response:'3',doc_id:docId.toString(),message:'Your doctor details has been successfully stored.'});
                            }else{
                                callback({response:'0',message:'Something gone wrong'});
                    }
                    });
                    }
                }
            })
            }else{
                callback({response:'0',message:'not a verified user'});
            }
        }).catch((error) => {
                console.log(error);
        })
        }else{

            callback({response:'0',message:'Pass a valid email address'});

        }
    },



};

module.exports=hospitalController;
