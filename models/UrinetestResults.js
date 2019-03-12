var urineDB = require('../app/models/Urine');
const Busboy = require('busboy');
var urineDataController = {
    
    insertUrinedata : (urineDataInfo,takePhoto,headers,req,callback) => {

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
                            var preInfo = JSON.parse(fields.preHealthcheckInfo);
                            //preInfo['takePhoto'] = "/images/"+text+d+file.name;
                            preInfo[0]['takePhoto'] = "/testphotos/"+text+d+file.name;
                            console.log('preInfo data...',preInfo[0]['takePhoto']);
                            console.log('form data fields...',fields);
                            var urinedb = new urineDB({
                                username:fields.username,
                                testId:testId,
                                clientType:fields.clientType,
                                client_Id:fields.client_Id,
                                clientName:fields.clientName,
                                latitude:fields.latitude,
                                longitude:fields.longitude,
                                weightScore:fields.weightScore,
                                kidneyScore:fields.kidneyScore,
                                diabetesScore:fields.diabetesScore,
                                urinaryTractScore:fields.urinaryTractScore,
                                liverScore:fields.liverScore,
                                preHealthcheckInfo:preInfo,
                                testFactors:JSON.parse(fields.testFactors),
                                testedTime:fields.testedTime
                            });

                            urinedb.save((success) => {
                                console.log(success);
                                callback({test_id: testId,
                                    response:'3',
                                    message: 'Your test results has been successfully stored.'});
                            });
                        }
                    });
                }

        function insertUrineResults(fields){
                    const testId = "id_"+Date.now();
                    console.log('fileds....',fields);
                    var urinedb = new urineDB({
                        username:fields.username,
                        testId:testId,
                        clientType:fields.clientType,
                        client_Id:fields.client_Id,
                        clientName:fields.clientName,
                        latitude:fields.latitude,
                        longitude:fields.longitude,
                        weightScore:fields.weightScore,
                        kidneyScore:fields.kidneyScore,
                        diabetesScore:fields.diabetesScore,
                        urinaryTractScore:fields.urinaryTractScore,
                        liverScore:fields.liverScore,
                        preHealthcheckInfo:JSON.parse(fields.preHealthcheckInfo),
                        testFactors:JSON.parse(fields.testFactors),
                        testedTime:fields.testedTime
                    });

                    urinedb.save((success) => {
                        console.log(success);
                        callback({test_id: testId,
                            response:'3',
                            message: 'Your test results has been successfully stored.'});
                    });
            }

        var busboy = new Busboy({ headers: headers });

        // The file upload has completed
        busboy.on('finish', function() {
            if(typeof takePhoto === undefined || takePhoto === null){
                console.log('optional objects..');
                insertUrineResults(urineDataInfo);
            }else{
            // Grabs your file object from the request.
            const file = takePhoto.takePhoto;
            // Begins the upload to the directory
            uploadToFolder(file,urineDataInfo);
            }
        });
        req.pipe(busboy);
    },

    deleteResults: (urineData,callback) => {
        urineDB.remove({username:new RegExp(urineData.username,'i'), testId:urineData.testId}).exec()
        .then((recordDeleted) => {
            if(recordDeleted){
                console.log('deleted successfully!!!!');
                var r = {response:'3',message:'Your test results has been successfully deleted.'};
                callback(r);
            }else{
                console.log('not deleted');
                var r = {response:'0',message:'Something went wrong'};
                callback(r);
            }
        })
        .catch((error) => {
            throw error;
        });            
}

};

module.exports = urineDataController;