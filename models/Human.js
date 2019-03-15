var HospotalDB = require('../app/models/Hospital');
var HumanDB = require('../app/models/Human');
var validator = require('validator');
var fs = require('fs');
const Busboy = require('busboy');

var Humaninformation={

    //Add HumanInfo
    insertHumanInfo:function(personalinfo,profilepic,headers,req,callback) {

        function uploadToFolder(file,fields) {

            HospotalDB.findOne({
                username: new RegExp(fields.username, 'i'),
                verification_status: true
            }).exec().then((HospitalFound) => {

                if (HospitalFound) {

                    HumanDB.findOne({username:new RegExp(fields.username,'i'),clientId:fields.clientId}).exec().then((HumanFound) => {

                        console.log('HumanFound..', HumanFound);
                        if (HumanFound) {
                            callback({response: '5', message: 'clientId already existed.'});
                        } else {

                            //var clientId = "id_" + Date.now();

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
                                        clientId: fields.clientId,
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
                                            clientId: fields.clientId,
                                            message: 'Your personal information has been successfully stored.'
                                        });
                                    });

                                }
                            });

                        }
                    });
                }
                else {
                    callback({
                        response: '0',
                        message: 'Your Hospital Not Registered with us.'
                    });
                }

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

    //Update HumanInfo
    updateHumanInfo : (personalinfo,profilepic,headers,req,callback) => {

        function uploadToFolder(file,fields) {

            HumanDB.findOne({username:new RegExp(fields.username,'i'),clientId:fields.clientId}).exec()
                .then((HumanFound) => {
                    console.log('HumanFound..',HumanFound);
                    if(HumanFound){

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
                                HumanDB.updateOne({username:new RegExp(personalinfo.username,'i'),clientId:fields.clientId },{$set:{
                                    name: fields.name,
                                    birthday: fields.birthday,
                                    email: fields.email,
                                    phone: fields.phone,
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

    },

    //Fetch HumanInfo
    fetchHumanInfo : (user,callback) => {
        HospotalDB.findOne({username:user.username},{_id:0,__v:0}).exec().then((results)=> {
                // console.log(results);
                if (results) {
                    HumanDB.find({username:user.username}, {_id: false, __v: false}).exec().then( (res) => {
                        callback({response: '3', HumanClients: res});
                    }) .catch((err) => {
                        console.log(err);
                    })
                }
                else {
                    callback({response: '0', message: 'you dont have HumanClints'});
                }
            }
        ).catch((error) => {
            console.log(error);
        })
    },

    //Delete HumanInfo
    deleteHumanInfo : (data,callback) => {

        HumanDB.findOne({clientId:data.clientId}).exec().then((fileFound)=>{

            if(fileFound){

                HumanDB.deleteOne({clientId:data.clientId}).exec().then((res) => {
                    if(res){
                        console.log('path of a profilePic..', fileFound.profilePic);
                        fs.unlink('./public'+fileFound.profilePic , (er, sc) => {
                            if (er) {
                                console.log('error found,', er);
                            }else {
                                console.log(sc);
                            }
                            callback({response: '3', message: 'successfully deleted'});
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                })

            }else
            {
                callback({response: '0', message: 'no Client found'});
            }
        }).catch((error) => {
            console.log(error);
        })
    }

}
module.exports = Humaninformation;