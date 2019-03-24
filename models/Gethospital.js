var hospitalDB = require('../app/models/Hospital');

var Doctor={

    getLocation:function(New,callback) {

        var limit = New.limit || 1000;
        console.log('limit value..'+limit);
        // get the max distance or set it to 10 kilometers
        var maxDistance = New.distance || 1000;
        console.log('max distance...'+maxDistance);
        console.log('Request object...'+New.longitude);
		console.log(New);
        // we need to convert the distance to radians
        // the raduis of Earth is approximately 6371 kilometers
        maxDistance /= 6371;

        // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        coords[0] = New.latitude;
        coords[1] = New.longitude;

        // find a location
        hospitalDB.find({
            loc: {
                $near: coords,
                $maxDistance: maxDistance
            }
        }).limit(limit).exec()
        .then((locations) => {
            if(locations){
            callback({response:'3',locations:locations});
            }else{
                callback({response:'0',message:'no locations found'});
            }
        })
        .catch((error) => {
            throw error;
        })
  
    }

};

module.exports=Doctor;