const Busboy = require('busboy');
var HospitalInfoDb = require('../app/models/HospitalInfo');
var fs = require('fs');
var Personalinformation={


    insertPersonalinfo:function(personalinfo,profilepic,headers,req,callback) {

       function uploadToFolder(file,fields) {

            HospitalInfoDb.findOne({username:new RegExp(fields.username,'i')}).exec()
                .then((userFound) => {
                console.log('userfound..',userFound);
                if(userFound){
                    callback({response:'0',message:'something gone wrong!!!'});
                }else{

                    var hospitalId = "id_"+Date.now();


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
                            var personDb = new HospitalInfoDb({
                                username:fields.username,
                                hospitalId:hospitalId,
                                name:fields.name,
                                telephone:fields.telephone,
                                fax:fields.fax,
                                contactPerson:fields.contactPerson,
                                address:fields.address,
                                addedTime:Date.now(),
                                profilePic: "/images/"+text+d+file.name
                            });

                            personDb.save((success) => {
                                console.log(success);
                                callback({response:'3',message:'Your personal information has been successfully stored.'});
                            });

                        }
                    });

                }
                });

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


    updateProfileInformation : (personalinfo,profilepic,headers,req,callback) => {

        function uploadToFolder(file,fields) {

            HospitalInfoDb.findOne({username:new RegExp(fields.username,'i')}).exec()
                .then((userFound) => {
                console.log('userfound..',userFound);
                if(userFound){

                    var hospitalId = "id_"+Date.now();

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
                            HospitalInfoDb.updateOne({username:new RegExp(personalinfo.username,'i')},{$set:{
                                hospitalId:hospitalId,
                                name:fields.name,
                                telephone:fields.telephone,
                                fax:fields.fax,
                                contactPerson:fields.contactPerson,
                                address:fields.address,
                                addedTime:Date.now(),
                                profilePic: "/images/"+text+d+file.name}}).exec()
                                .then((profileUpdate) => {
                                    if(profileUpdate){

                                        fs.unlink('./public'+userFound.profilePic, (err) => {
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
};

module.exports=Personalinformation;