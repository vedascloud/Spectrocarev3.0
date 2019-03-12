const Busboy = require('busboy');
var HospitalInfoDb = require('../app/models/HospitalInfo');
var TestReservDb = require('../app/models/TestReservation');


var TestReservationInfo={

    insertTestReservInfo:function(test,callback) {

            HospitalInfoDb.findOne({username:new RegExp(test.username,'i')}).exec()
                .then((userFound) => {
                    console.log('userfound..',userFound);
                    if(userFound){
                                console.log('form data testreserv...',test);
                                var personDb = new TestReservDb({
                                    username:test.username,
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
                });
    },


    updateTestReservInfo:function(test,callback) {

        HospitalInfoDb.findOne({username:new RegExp(test.username,'i')}).exec()
            .then((userFound) => {
                console.log('userfound..',userFound);
                if(userFound){
                    console.log('form data testreserv...',test);
                    TestReservDb.updateOne({username:new RegExp(test.username,'i'),_id:test.id},{$set:{
                        clientId:test.clientId,
                        clientType:test.clientType,
                        name:test.name,
                        date:test.date,
                        time:test.time,
                        testName:test.testName,
                        note:test.note
                    }}).exec().then((testreservUpdate) => {
                        if(testreservUpdate){
                            callback({response:'3',message:'Your testreserv information has been successfully updated.'})
                        }else{
                            callback({response:'0',message:'testreserv information not updated'});
                        }
                    })
                        .catch((error) => {
                            console.log(error);
                        })

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

        TestReservDb.findOne({_id:data.id}).exec().then((fileFound)=>{

            if(fileFound){

                TestReservDb.deleteOne({_id: data.id}).exec().then((res) => {
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

    /*updateTestReservInfo : (personalinfo,profilepic,headers,req,callback) => {

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


    },

    //Fetch Hospital
    fetchTestReservInfo : (user,callback) => {
        HospitalDb.findOne({username:user.username},{_id:0,__v:0}).exec().then((results)=> {
                // console.log(results);
                if (results) {
                    HospitalInfoDb.find({}, {_id: false, __v: false}).exec().then( (res) => {
                        callback({response: '3', Hospital: res});
                    }) .catch((err) => {
                        console.log(err);
                    })
                }
                else {
                    callback({response: '0', message: 'user dont have account'});
                }
            }
        ).catch((error) => {
            console.log(error);
        })
    },

    //Delete Hospital
    deleteTestReservInfo : (data,callback) => {

        HospitalInfoDb.findOne({hospitalId:data.hospitalId}).exec().then((fileFound)=>{

            if(fileFound){

                HospitalInfoDb.deleteOne({hospitalId: data.hospitalId}).exec().then((res) => {
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
                callback({response: '0', message: 'no Hospital found'});
            }
        }).catch((error) => {
            console.log(error);
        })
    }
*/
};

module.exports=TestReservationInfo;