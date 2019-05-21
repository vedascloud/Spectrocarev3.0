var HospotalDB = require('../app/models/Hospital');
var urineDB = require('../app/models/Urine');
//var fs = require('fs');
//const Busboy = require('busboy');

var urineDataController = {

    //Add UrineTest Data
   // insertUrinedata:function(urineDataInfo,takePhoto,headers,req,callback) {
    insertUrinedata:function(fields,callback) {

        //function uploadToFolder(file,fields) {

            HospotalDB.findOne({
                username: new RegExp(fields.username, 'i'),
                verification_status: true
            }).exec().then((HospitalFound) => {

                if (HospitalFound) {
                    var testId = "id_" + Date.now();

                    //var text = ""; //random text
                    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                    //for (let i = 0; i < 5; i++) {
                    //    text += possible.charAt(Math.floor(Math.random() * possible.length));
                    //}
                    //let d = Date.now();
                    //let imagepath = "./public/testphotos/" + text + d + file.name;
                    //file.mv(imagepath, (err, suc) => {

                    //    if (err) {
                    //        console.log(err);
                    //        callback({response: '0', message: 'something gone wrong!!!'});
                    //    } else {
                            //console.log(suc);
                            console.log('form data fields...', fields);

                            urineDB.findOne({username: new RegExp(fields.username, 'i'),client_Id:fields.client_Id,testedTime:fields.testedTime}).exec().then((ReportFound) => {

                                //console.log('founded data...',ReportFound);

                                if (ReportFound){
                                    console.log('Duplicate test record.');
                                    callback({
                                        response: '0',
                                        message: 'Duplicate test record.'
                                    });
                                }
                                else {
                                    var personDb = new urineDB({
                                        id:fields.id,
                                        username:fields.username,
                                        testId:testId,
                                        clientType:fields.clientType,
                                        client_Id:fields.client_Id,
                                        clientName:fields.clientName,
                                        latitude:fields.latitude,
                                        longitude:fields.longitude,
                                        //testFactors:JSON.parse(fields.testFactors),
                                        testFactors:fields.testFactors,
                                        testedTime:fields.testedTime,
                                        //takePhoto: "/testphotos/" + text + d + file.name
                                    });

                                    personDb.save((success) => {
                                        console.log(success);
                                        callback({
                                            response: '3',
                                            test_id: testId,
                                            message: 'Your personal information has been successfully stored.'
                                        });
                                    });
                                }

                            }).catch((error) => {
                                console.log(error);
                            })



                        //}
                    //});

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
        //}

        /*var busboy = new Busboy({ headers: headers });

        // The file upload has completed
        busboy.on('finish', function() {

            // Grabs your file object from the request.
            const file = takePhoto.takePhoto;

            // Begins the upload to the AWS S3
            uploadToFolder(file,urineDataInfo);

        });

        req.pipe(busboy);*/
    },

    //Delete UrineTest Data
    deleteResults: (urineData,callback) => {

        urineDB.findOne({username:new RegExp(urineData.username,'i'),testId:urineData.testId}).exec().then((fileFound)=>{

            console.log('form data fields...', urineData);

            if(fileFound){

                urineDB.deleteOne({username:new RegExp(urineData.username,'i'), testId:urineData.testId}).exec()
                    .then((recordDeleted) => {
                        if(recordDeleted){

                            callback({response: '3', message: 'Your test results has been successfully deleted'});

                            /*console.log('path of a takePhoto..', fileFound.takePhoto);

                            fs.unlink('./public'+fileFound.takePhoto , (er, sc) => {
                                if (er) {
                                    console.log('error found,', er);
                                }else {
                                    console.log(sc);
                                }
                                callback({response: '3', message: 'Your test results has been successfully deleted'});
                            });*/

                        }else{
                            console.log('not deleted');
                            var r = {response:'0',message:'Something went wrong'};
                            callback(r);
                        }
                    })
                    .catch((error) => {
                        throw error;
                    });

            }else
            {
                callback({response: '0', message: 'no Data found'});
            }
        }).catch((error) => {
            console.log(error);
        })
    }

};

module.exports = urineDataController;