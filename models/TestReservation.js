const Busboy = require('busboy');
var HospitalInfoDb = require('../app/models/Hospital');
var TestReservDb = require('../app/models/TestReservation');

var TestReservationInfo={

    insertTestReservInfo:function(test,callback) {

            HospitalInfoDb.findOne({username:new RegExp(test.username,'i')}).exec()
                .then((userFound) => {
                    console.log('userfound..',userFound);
                    if(userFound){
                        var testReservNo = "testNo_" + Date.now();
                                console.log('form data testreserv...',test);
                                var personDb = new TestReservDb({
                                    username:test.username,
                                    testReservNo:testReservNo,
                                    clientId:test.clientId,
                                    clientType:test.clientType,
                                    name:test.name,
                                    date:test.date,
                                    time:test.time,
                                    testName:test.testName,
                                    note:test.note
                                });

                                personDb.save((success) => {
                                    console.log(success);
                                    callback({response:'3',message:'Your testreservation information has been successfully stored.'});
                                });
                    }
                    else
                    {
                        callback({response:'0',message:'user dont have account'});
                    }
                });
    },

    updateTestReservInfo:function(test,callback) {

        HospitalInfoDb.findOne({username:new RegExp(test.username,'i')}).exec()
            .then((userFound) => {

                if(userFound){
                    console.log('userfound..',userFound);
                    console.log('form data testreserv...',test);

                    TestReservDb.findOne({username:new RegExp(test.username,'i'),testReservNo:test.testReservNo}).exec().then((testreservFind) => {
                        if(testreservFind){

                            TestReservDb.updateOne({username:new RegExp(test.username,'i'),testReservNo:test.testReservNo},{$set:{
                                clientId:test.clientId,
                                clientType:test.clientType,
                                name:test.name,
                                date:test.date,
                                time:test.time,
                                testName:test.testName,
                                note:test.note
                            }}).exec().then((testreservUpdate) => {
                                if(testreservUpdate){
                                    callback({response:'3',message:'Your testreserv information has been successfully updated.'});
                                }else{
                                    callback({response:'0',message:'Your testreserv not updated.'});
                                }
                            }).catch((error) => {
                                    console.log(error);
                                })

                        }else{
                            callback({response:'0',message:'testReservNo not Found.'});
                        }
                    }).catch((error) => {
                        console.log(error);
                    })

                }
                else{

                    callback({response:'0',message:'user not Found.'});

                }
            });
    },

    //Fetch TertReserv
    fetchTestReservInfo : (user,callback) => {
        HospitalInfoDb.findOne({username:user.username},{_id:0,__v:0}).exec().then((results)=> {
                // console.log(results);
                if (results) {
                    if (user.clientType === 'Human')
                    {
                        TestReservDb.find({clientType: "Human"}, {__v: false}).exec().then((res) => {
                            callback({response: '3', HumanTestReservs: res});
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                    else if (user.clientType === 'Pet')
                    {
                        TestReservDb.find({clientType: "Pet"}, {__v: false}).exec().then((res) => {
                            callback({response: '3', PetTestReservs: res});
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }
                else {
                    callback({response: '0', message: 'user dont have account'});
                }
            }
        ).catch((error) => {
            console.log(error);
        })
    },

    //Delete TestReserv
    deleteTestReservInfo : (data,callback) => {

        TestReservDb.findOne({testReservNo:data.testReservNo}).exec().then((fileFound)=>{

            if(fileFound){

                TestReservDb.deleteOne({testReservNo:data.testReservNo}).exec().then((res) => {
                    if(res){
                        callback({response: '3', message: 'successfully deleted'});
                    }
                    else {
                        callback({response: '0', message: 'Delete Operation Failed'});
                    }
                }).catch((error) => {
                    console.log(error);
                })

            }else
            {
                callback({response: '0', message: 'no Data found'});
            }
        }).catch((error) => {
            console.log(error);
        })
    }

};

module.exports=TestReservationInfo;