const Busboy = require('busboy');

var HospitalDb = require('../app/models/Hospital');
var HospitalInfoDb = require('../app/models/HospitalInfo');
var HumanDb = require('../app/models/Human');
var PetDb = require('../app/models/Pet');
var TestReservDb = require('../app/models/TestReservation');
var UrineDb = require('../app/models/Urine');
var BloodDb = require('../app/models/Blood');
var FeedbackDb = require('../app/models/feedback');
var MobileDb = require('../app/models/Notification');

var DeleteTotalData={

    //Delete All Collections Data
    deleteData : (fields,callback) => {

        console.log("username for delete-data : ",fields.username);

        HospitalDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((HospitalFound)=>{

                if (HospitalFound){

                    HospitalDb.deleteOne({username: new RegExp(fields.username, 'i')}).exec().then((HospitalDeleted) => {

                        if (HospitalDeleted){

                        HospitalInfoDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((HospitalInfoFound) => {

                                if (HospitalInfoFound) {

                                    HospitalInfoDb.deleteOne({username: new RegExp(fields.username, 'i')}).exec().then((HospitalInfoDeleted) => {

                                            if (HospitalInfoDeleted){

                                                HumanDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((HumanFound) => {

                                                        if (HumanFound) {

                                                            HumanDb.deleteMany({username: new RegExp(fields.username, 'i')}).exec().then((HumanDeleted) => {

                                                                    if (HumanDeleted){

                                                                        PetDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((PetFound) => {

                                                                                if (PetFound) {

                                                                                    PetDb.deleteMany({username: new RegExp(fields.username, 'i')}).exec().then((PetDeleted) => {

                                                                                            if (PetDeleted){

                                                                                                TestReservDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((TestFound) => {

                                                                                                        if (TestFound) {

                                                                                                            TestReservDb.deleteMany({username: new RegExp(fields.username, 'i')}).exec().then((TestDeleted) => {

                                                                                                                    if (TestDeleted){

                                                                                                                        UrineDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((UrineDataFound) => {

                                                                                                                                if (UrineDataFound) {

                                                                                                                                    UrineDb.deleteMany({username: new RegExp(fields.username, 'i')}).exec().then((UrineDeleted) => {

                                                                                                                                            if (UrineDeleted){

                                                                                                                                                BloodDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((BloodDataFound) => {

                                                                                                                                                        if (BloodDataFound) {

                                                                                                                                                            BloodDb.deleteMany({username: new RegExp(fields.username, 'i')}).exec().then((BloodDeleted) => {

                                                                                                                                                                    if (BloodDeleted){

                                                                                                                                                                        FeedbackDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((FeedbackFound) => {

                                                                                                                                                                                if (FeedbackFound) {

                                                                                                                                                                                    FeedbackDb.deleteMany({username: new RegExp(fields.username, 'i')}).exec().then((FeedbackDeleted) => {

                                                                                                                                                                                            if (FeedbackDeleted) {

                                                                                                                                                                                                MobileDb.findOne({username: new RegExp(fields.username, 'i')}).exec().then((MobileFound) => {

                                                                                                                                                                                                    if (MobileFound) {

                                                                                                                                                                                                        MobileDb.deleteMany({username: new RegExp(fields.username, 'i')}).exec().then((MobileDeleted) => {

                                                                                                                                                                                                            if (MobileDeleted) {

                                                                                                                                                                                                                callback({
                                                                                                                                                                                                                    response: '3',
                                                                                                                                                                                                                    message: 'Data Deleted.'
                                                                                                                                                                                                                });

                                                                                                                                                                                                            }

                                                                                                                                                                                                        })

                                                                                                                                                                                                    }
                                                                                                                                                                                                    else
                                                                                                                                                                                                    {
                                                                                                                                                                                                        callback({response:'0',message:'You dont have Mobiledata.'});
                                                                                                                                                                                                    }

                                                                                                                                                                                                })

                                                                                                                                                                                            }

                                                                                                                                                                                        }).catch((error) => {
                                                                                                                                                                                        console.log(error);
                                                                                                                                                                                        })

                                                                                                                                                                                }
                                                                                                                                                                                else
                                                                                                                                                                                {
                                                                                                                                                                                    callback({response:'0',message:'You dont have Feedbackdata.'});
                                                                                                                                                                                }

                                                                                                                                                                            }).catch((error) => {
                                                                                                                                                                            console.log(error);
                                                                                                                                                                            })

                                                                                                                                                                    }
                                                                                                                                                            }).catch((error) => {
                                                                                                                                                                console.log(error);
                                                                                                                                                            })

                                                                                                                                                        }
                                                                                                                                                        else
                                                                                                                                                        {
                                                                                                                                                            callback({response:'0',message:'You dont have BloodResdata.'});
                                                                                                                                                        }
                                                                                                                                                }).catch((error) => {
                                                                                                                                                    console.log(error);
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                    }).catch((error) => {
                                                                                                                                        console.log(error);
                                                                                                                                    })

                                                                                                                                }
                                                                                                                                else
                                                                                                                                {
                                                                                                                                    callback({response:'0',message:'You dont have UrineResdata.'});
                                                                                                                                }
                                                                                                                        }).catch((error) => {
                                                                                                                            console.log(error);
                                                                                                                        })

                                                                                                                    }
                                                                                                            }).catch((error) => {
                                                                                                                console.log(error);
                                                                                                            })

                                                                                                        }
                                                                                                        else
                                                                                                        {
                                                                                                            callback({response:'0',message:'You dont have TestReservdata.'});
                                                                                                        }
                                                                                                }).catch((error) => {
                                                                                                    console.log(error);
                                                                                                })

                                                                                            }
                                                                                    }).catch((error) => {
                                                                                        console.log(error);
                                                                                    })

                                                                                }
                                                                                else
                                                                                {
                                                                                    callback({response:'0',message:'You dont have Petdata.'});
                                                                                }
                                                                        }).catch((error) => {
                                                                            console.log(error);
                                                                        })

                                                                    }
                                                            }).catch((error) => {
                                                                console.log(error);
                                                            })
                                                        }
                                                        else
                                                        {
                                                            callback({response:'0',message:'You dont have Humandata.'});
                                                        }
                                                }).catch((error) => {
                                                    console.log(error);
                                                })

                                            }
                                    }).catch((error) => {
                                        console.log(error);
                                    })

                                }
                                else
                                {
                                    callback({response:'0',message:'You dont have HospitalInfodata.'});
                                }
                        }).catch((error) => {
                            console.log(error);
                        })

                        }

                    }).catch((error) => {
                    console.log(error);
                    })

                }
                else
                {
                    callback({response:'0',message:'You dont have Hospitaldata.'});
                }
        }).catch((error) => {
            console.log(error);
        })

    }

};

module.exports=DeleteTotalData;