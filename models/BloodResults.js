var HospotalDB = require('../app/models/Hospital');
var bloodDB = require('../app/models/Blood');
var fs = require('fs');
const Busboy = require('busboy');

var bloodDataController = {

    insertBloodData:function(bloodDataInfo,takePhoto,headers,req,callback) {

        function uploadToFolder(file,fields) {

            HospotalDB.findOne({
                username: new RegExp(fields.username, 'i'),
                verification_status: true
            }).exec().then((HospitalFound) => {

                if (HospitalFound) {


                    var testId = "id_" + Date.now();

                    var text = ""; //random text
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                    for (let i = 0; i < 5; i++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    let d = Date.now();
                    let imagepath = "./public/testphotos/" + text + d + file.name;
                    file.mv(imagepath, (err, suc) => {
                        if (err) {
                            console.log(err);
                            callback({response: '0', message: 'something gone wrong!!!'});
                        } else {
                            console.log(suc);
                            console.log('form data fields...', fields);
                            var personDb = new bloodDB({
                                username:fields.username,
                                testId:testId,
                                clientType:fields.clientType,
                                client_Id:fields.client_Id,
                                clientName:fields.clientName,
                                latitude:fields.latitude,
                                longitude:fields.longitude,
                                testFactors:JSON.parse(fields.testFactors),
                                testedTime:fields.testedTime,
                                takePhoto: "/testphotos/" + text + d + file.name
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
            const file = takePhoto.takePhoto;

            // Begins the upload to the AWS S3
            uploadToFolder(file,bloodDataInfo);

        });

        req.pipe(busboy);
    },

    /*insertBloodData : (bloodDataInfo,takePhoto,headers,req,callback) => {

        function uploadToFolder(file,fields) {

            const testId = "id_"+Date.now();
            var text = ""; //random text
            var possible = "1234567890";

            for( let i=0; i < 5; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            let d= Date.now();
            let imagepath = "./public/testphotos/"+text+d+file.name;
            file.mv(imagepath, (err,suc) => {
                if(err){
                    console.log(err);
                    callback({response:'0',message:'something gone wrong!!!'});
                }else{
                    console.log(suc);
                    console.log('form data fields...',fields);

                    var blooddb = new bloodDB({
                        username:fields.username,
                        testId:testId,
                        clientType:fields.clientType,
                        client_Id:fields.client_Id,
                        clientName:fields.clientName,
                        latitude:fields.latitude,
                        longitude:fields.longitude,
                        testFactors:JSON.parse(fields.testFactors),
                        testedTime:fields.testedTime,
                        takePhoto: "/testphotos/" + text + d + file.name
                    });

                    blooddb.save((success) => {
                        console.log(success);
                        callback({
                            test_id: testId,
                            response:'3',
                            message: 'Your test results has been successfully stored.'});
                    });
                }
            });
        }

        function insertBloodResults(fields){
            const testId = "id_"+Date.now();
            var text = ""; //random text
            var possible = "1234567890";

            for( let i=0; i < 5; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            let d= Date.now();

            console.log('fileds....',fields);

            var blooddb = new bloodDB({
                username:fields.username,
                testId:testId,
                clientType:fields.clientType,
                client_Id:fields.client_Id,
                clientName:fields.clientName,
                latitude:fields.latitude,
                longitude:fields.longitude,
                testFactors:JSON.parse(fields.testFactors),
                testedTime:fields.testedTime,
                takePhoto: "/testphotos/" + text + d + file.name

            });

            blooddb.save((success) => {
                console.log(success);
                callback({
                    test_id: testId,
                    response:'3',
                    message: 'Your test results has been successfully stored.'});
            });
        }

        var busboy = new Busboy({ headers: headers });

        // The file upload has completed
        busboy.on('finish', function() {
            if(typeof takePhoto === undefined || takePhoto === null){
                console.log('optional objects..');
                insertBloodResults(bloodDataInfo);
            }else{
                // Grabs your file object from the request.
                const file = takePhoto.takePhoto;
                // Begins the upload to the directory
                uploadToFolder(file,bloodDataInfo);
            }
        });
        req.pipe(busboy);
    },*/

    deleteBloodData: (bloodData,callback) => {

        bloodDB.findOne({username:new RegExp(bloodData.username,'i'),testId:bloodData.testId}).exec().then((fileFound)=>{

            if(fileFound){

                bloodDB.deleteOne({username:new RegExp(bloodData.username,'i'), testId:bloodData.testId}).exec()
                    .then((recordDeleted) => {
                        if(recordDeleted){

                            console.log('path of a takePhoto..', fileFound.takePhoto);

                            fs.unlink('./public'+fileFound.takePhoto , (er, sc) => {
                                if (er) {
                                    console.log('error found,', er);
                                }else {
                                    console.log(sc);
                                }
                                callback({response: '3', message: 'Your test results has been successfully deleted'});
                            });

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

module.exports = bloodDataController;