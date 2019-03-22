var fs = require('fs');
var hospitalDB = require('../app/models/Hospital');

var Language = {
    
    fetchLanguage : (callback) => {

      const json = require('big-json');
 
      const readStream = fs.createReadStream('./app/configfiles/language.json');
      const parseStream = json.createParseStream();
       
      parseStream.on('data', function(pojo) {
          // => receive reconstructed POJO
          callback(pojo);
      });
       
      readStream.pipe(parseStream);

      },

    updateLanguage : (userParam,callback) => {

      hospitalDB.updateOne({username:userParam.username},{$set:{prefer_language:userParam.prefer_language}}).exec()
      .then((userUpdated) => {
        if(userUpdated){
          callback({response:'3',message:'language updated successfully'});
        }else{
          callback({response:'0',message:'Something gone wrong!!!'});
        }
      })
    }

}

module.exports=Language;
