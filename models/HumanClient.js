var HospotalDB = require('../app/models/Hospital');
var HumanDB = require('../app/models/Human');
var validator = require('validator');
var fs = require('fs');
const Busboy = require('busboy');

var Humaninformation={

    insertHumanInfo:function(personalinfo,profilepic,headers,req,callback) {

        function uploadToFolder(file,fields) {

            HospotalDB.findOne({
                username: new RegExp(fields.username, 'i'),
                verification_status: true
            }).exec().then((HospitalFound) => {

                HumanDB.findOne({email: fields.email}).exec().then((HumanFound) => {

                    console.log('HumanFound..', HumanFound);
                    if (HumanFound) {
                        callback({response: '0', message: 'something gone wrong!!!'});
                    } else {

                        var clientId = "id_" + Date.now();


                        var text = ""; //random text
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                        for (let i = 0; i < 5; i++) {
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        let d = Date.now();
                        let imagepath = "./public/images/" + text + d + file.name;
                        file.mv(imagepath, (err, suc) => {
                            if (err) {
                                console.log(err);
                                callback({response: '0', message: 'something gone wrong!!!'});
                            } else {
                                console.log(suc);
                                console.log('form data fields...', fields);
                                var personDb = new HumanDB({
                                    username: fields.username,
                                    clientId: clientId,
                                    name: fields.name,
                                    email: fields.email,
                                    phone: fields.phone,
                                    birthday: fields.birthday,
                                    gender: fields.gender,
                                    bloodType: fields.bloodType,
                                    height: fields.height,
                                    weight: fields.weight,
                                    note: fields.note,
                                    addedTime: Date.now(),
                                    profilePic: "/images/" + text + d + file.name
                                });

                                personDb.save((success) => {
                                    console.log(success);
                                    callback({
                                        response: '3',
                                        message: 'Your personal information has been successfully stored.'
                                    });
                                });

                            }
                        });

                    }
                });

            }).catch((error) => {
                console.log(error);
            })
        }

        var busboy = new Busboy({ headers: headers });

        // The file upload has completed
        busboy.on('finish', function() {

            // Grabs your file object from the request.
            const file = profilepic.profilepic;

            // Begins the upload to the AWS S3
            uploadToFolder(file,personalinfo);

        });

        req.pipe(busboy);
    },

    updateHumanInfo : (personalinfo,profilepic,headers,req,callback) => {

        function uploadToFolder(file,fields) {

            HumanDB.findOne({username:new RegExp(fields.username,'i')}).exec()
                .then((HumanFound) => {
                    console.log('HumanFound..',HumanFound);
                    if(HumanFound){

                        var clientId = "id_"+Date.now();

                        var text = ""; //random text
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                        for( let i=0; i < 5; i++ ){
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        let d= Date.now();
                        let imagepath = "./public/images/"+text+d+file.name;
                        file.mv(imagepath, (err,suc) => {
                            if(err){
                                console.log(err);
                                callback({response:'0',message:'something gone wrong!!!'});
                            }else{
                                console.log(suc);
                                console.log('form data fields...',fields);
                                HumanDB.updateOne({username:new RegExp(personalinfo.username,'i')},{$set:{
                                    clientId:clientId,
                                    name: fields.name,
                                    email: fields.email,
                                    phone: fields.phone,
                                    birthday: fields.birthday,
                                    gender: fields.gender,
                                    bloodType: fields.bloodType,
                                    height: fields.height,
                                    weight: fields.weight,
                                    note: fields.note,
                                    addedTime: Date.now(),
                                    profilePic: "/images/" + text + d + file.name}}).exec()
                                    .then((profileUpdate) => {
                                        if(profileUpdate){

                                            fs.unlink('./public'+HumanFound.profilePic, (err) => {
                                                if (err) throw err;
                                                console.log('path file was deleted');
                                            });

                                            callback({response:'3',message:'Your personal information has been successfully updated.'})
                                        }else{
                                            callback({response:'0',message:'Personal information not updated'});
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })

                            }
                        });

                    }else{
                        callback({response:'0',message:'please provide your data first'});
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        }

        var busboy = new Busboy({ headers: headers });

        // The file upload has completed
        busboy.on('finish', function() {

            // Grabs your file object from the request.
            const file = profilepic.profilepic;

            // Begins the upload to the AWS S3
            uploadToFolder(file,personalinfo);

        });

        req.pipe(busboy);

    }




}
module.exports = Humaninformation;