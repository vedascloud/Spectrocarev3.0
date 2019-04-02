var HospitalDb = require('../app/models/Hospital');
var HumanDb = require('../app/models/Human');
var PetDb = require('../app/models/Pet');

var FetchClients = {

    fetchClientsData : (user,callback) => {

        HospitalDb.findOne({username:user.username},{_id:0,__v:0}).exec().then((results)=> {

                if (results) {
                    if (user.clientType === 'Human')
                    {
                        HumanDb.find({username: new RegExp(user.username, 'i')}).exec()
                            .then((humanclient) => {

                                HumanDb.aggregate([
                                    {
                                        $match: {
                                            username: new RegExp(user.username, 'i')
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "urineresults",
                                            localField: "clientId",
                                            foreignField: "client_Id",
                                            as: "Human_Urine_Test_Results"
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "bloodresults",
                                            localField: "clientId",
                                            foreignField: "client_Id",
                                            as: "Human_Blood_Test_Results"
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "testreservations",
                                            localField: "clientId",
                                            foreignField: "clientId",
                                            as: "Human_TestReservation_Results"
                                        }
                                    }
                                ]).exec()
                                    .then((hreservData) => {

                                        if (hreservData) {
                                            var r = {
                                                response: '3',
                                                Human_Clients_Data: hreservData
                                            };
                                            callback(r);
                                        }
                                    }).catch((error) => {
                                    console.log(error);
                                })

                            }).catch((error) => {
                            console.log(error);
                        })

                    }
                    else if (user.clientType === 'Pet')
                    {
                        PetDb.find({username: new RegExp(user.username, 'i')}).exec()
                            .then((petclient) => {

                                PetDb.aggregate([
                                    {
                                        $match: {
                                            username: new RegExp(user.username, 'i')
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "urineresults",
                                            localField: "clientId",
                                            foreignField: "client_Id",
                                            as: "Pet_Urine_Test_Results"
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "bloodresults",
                                            localField: "clientId",
                                            foreignField: "client_Id",
                                            as: "Pet_Blood_Test_Results"
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "testreservations",
                                            localField: "clientId",
                                            foreignField: "clientId",
                                            as: "Pet_TestReservation_Results"
                                        }
                                    }
                                ]).exec()
                                    .then((preservData) => {

                                        if (preservData) {

                                            var r = {
                                                response: '3',
                                                Pet_Clients_Data: preservData
                                            };
                                            callback(r);

                                        }
                                    }).catch((error) => {
                                    console.log(error);
                                })

                            }).catch((error) => {
                            console.log(error);
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
    }


};

module.exports = FetchClients;