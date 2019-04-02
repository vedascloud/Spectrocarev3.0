var nodemailer = require('nodemailer');
var fs = require('fs');

var Hospital   = require('../app/models/Hospital');

var Add= {

    addCustomer: function (userParam, callback) {
        let username = userParam.username;
        console.log(userParam);

        if (userParam.register_type === 'Manual') {

            Hospital.findOne({username: new RegExp(username,'i')}).exec()
                .then((userFound) => {
                    console.log('user found...',userFound);
                    if(userFound){

                        if(userFound.register_type !== 'Manual' && userFound.register_type !== 'Linked'){

                            console.log('already logged in from social-media');
                            var z = {
                                response: '6',
                                message: 'You have already logged from your social-media account'
                            };
                            callback(z);

                        }else{
                            if(userFound.verification_status === true){
                                var r = {
                                    response: '5',
                                    message: 'The phone/email is already registered.'
                                };
                                callback(r);
                            }else {

                                var text = "";
                                var possible = "0123456789";

                                for (var i = 0; i < 4; i++) {
                                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                                }

                                console.log('pin:' + text);

                                //file read starts
                                fs.readFile('./app/configfiles/Register.html', function (err, data) {

                                    var str = data.toString();

                                    var html = str.replace("%s", text);
                                    var html1 = html.replace("%m", username);

                                    var transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: 'contact.spectrum.in@gmail.com',
                                            pass: 'vedas2017'
                                        }
                                    });

                                    var mailOptions = {
                                        from: 'contact.spectrum.in@gmail.com',
                                        to: userParam.username,
                                        subject: 'Email Verification',
                                        html: html1
                                    };

                                    Hospital.updateOne({username: new RegExp(username, 'i')}, {
                                        $set: {
                                            password: userParam.password,
                                            otp: text,
                                            loc: [userParam.latitude, userParam.longitude],
                                            register_time: userParam.register_time,
                                            verification_status: false,
                                            prefer_language: userParam.prefer_language
                                        }
                                    }, (error, update) => {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log(update);
                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    console.log(error);
                                                    callback({response: '0', message: err});
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                }
                                            });
                                            var r = {
                                                response: '3',
                                                message: 'Your registration was successful! '
                                            };
                                            callback(r);
                                        }
                                    });

                                });
                                //file read ends here
                            }
                        }
                    }else{
                        var text = "";
                        var possible = "0123456789";

                        for (var i = 0; i < 4; i++) {
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        console.log('pin:' + text);

                        //file read starts
                        fs.readFile('./app/configfiles/Register.html', function (err, data) {

                            var str = data.toString();

                            var html = str.replace("%s", text);
                            var html1 = html.replace("%m", username);

                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'contact.spectrum.in@gmail.com',
                                    pass: 'vedas2017'
                                }
                            });

                            var mailOptions = {
                                from: 'contact.spectrum.in@gmail.com',
                                to: userParam.username,
                                subject: 'Email Verification',
                                html: html1
                            };

                            var myobj = new Hospital({
                                username: username,
                                password: userParam.password,
                                otp: text,
                                loc:[userParam.latitude,userParam.longitude],
                                register_time: userParam.register_time,
                                register_type: userParam.register_type,
                                verification_status: "false",
                                prefer_language: userParam.prefer_language
                            });

                            myobj.save(function(err){
                                if(err){
                                    console.log(err);
                                    callback({response:'0',message:err});
                                }else{

                                    var r = {response: '3', message: 'Your registration was successful!'};
                                    callback(r);
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);

                                        } else {
                                            console.log('Email sent: ' + info.response);

                                        }
                                    });

                                }
                            });

                        });
                        //file read ends here
                    }

                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }
};

module.exports=Add;