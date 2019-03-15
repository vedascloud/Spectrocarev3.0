var jsonfileDB = require('../app/models/jsonfiles');
var userDB = require('../app/models/Hospital');
var fs = require('fs');
const Busboy = require('busboy');
var jsonHandling = {

    uploadJSON : (params,filesData,headers,req,callback) => {

        function uploadToFolder(file,fields) {

              if(fields.username==='viswa'){

                        jsonfileDB.findOne({filename:file.name}).exec()
                            .then((jsonfileFound) => {
                            //File Update
                            if(jsonfileFound){

                                var url = file.name;

                                /*var m = url.toString().replace("http://54.210.61.0/spectrochips/public/jsonfiles/", "");
                                console.log('path of a file..', m);
                                fs.unlink('../Spectrocare_Version_3/public/jsonfiles/' + m, (er, sc) => {
                                    if (er) {
                                        console.log('error found,', er);
                                    }else{
                                        console.log(sc);
                                    }
                                });*/
                                file.mv('./public/jsonfiles/' +url, function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                    //res.send('File uploaded!');
                                    jsonfileDB.find({}, (er, len) => {
                                        if (er) {
                                            console.log(er);
                                        }
                                        else if (len.length > 0) {
                                            jsonfileDB.updateOne({'filename': url}, {
                                                $set: {
                                                    'filename': url,
                                                    'addedTime': Date.now(),
                                                    'type': fields.type,
                                                    'url': "/jsonfiles/" + file.name
                                                }
                                            }, (em, sm) => {
                                                if (em) {
                                                    console.log(em);
                                                } else {
                                                    console.log(sm);

                                                    callback({
                                                        result: '2',
                                                        message: 'file updated',
                                                        url: "/jsonfiles/" + file.name
                                                    });
                                                }
                                            })
                                        }
                                    })
                                }
                                })

                            }
                            //File Upload/Add
                            else{
                                var text = ""; //random text
                                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                                for( let i=0; i < 5; i++ ){
                                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                                }
                                let d= Date.now();
                                //let imagepath = "./public/jsonfiles/"+text+d+file.name;
                                let imagepath = "./public/jsonfiles/"+file.name;
                                file.mv(imagepath, (err,suc) => {
                                    if(err){
                                        throw err;
                                    }else{
                                        console.log('form data fields...',fields);
                                        var jsonDB = new jsonfileDB({
                                            filename:file.name,
                                            addedTime:Date.now(),
                                            type:fields.type,
                                            url: "/jsonfiles/"+file.name
                                        });

                                        jsonDB.save((success) => {
                                            console.log('request body..'+success);
                                            callback({response:'3',
                                                      message:'Your JSON file has been successfully stored.',
                                                      url:"/jsonfiles/"+file.name});
                                        });

                                    }
                                });

                            }
                            })

                }
            else{
                  callback({response:'0',message:'user is invalid'});
              }
        }

        var busboy = new Busboy({ headers: headers });

        // The file upload has completed
        busboy.on('finish', function() {

            // Grabs your file object from the request.
            const file = filesData.jsonfile;

            // Begins the upload to the AWS S3
            uploadToFolder(file,params);

        });

        req.pipe(busboy);
    },

    //Fetch Files
    fetchJSON : (user,callback) => {
        userDB.findOne({username:user.username},{_id:0,__v:0}).exec().then((results)=> {
           // console.log(results);
                if (results) {
                    jsonfileDB.find({}, {_id: false, __v: false}).exec().then( (res) => {
                            callback({response: '3', files: res});
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

    //Delete File
    deleteJSON : (data,callback) => {

        jsonfileDB.findOne({filename:data.filename}).exec().then((fileFound)=>{

            if(fileFound){

                jsonfileDB.deleteOne({filename: data.filename}).exec().then((res) => {
                     if(res){
                         console.log('path of a file..', fileFound.url);
                        fs.unlink('./public'+fileFound.url , (er, sc) => {
                            if (er) {
                                console.log('error found,', er);
                            }else {
                                console.log(sc);
                            }
                            callback({result: '3', message: 'successfully deleted'});
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                })

            }else
            {
                callback({result: '0', message: 'no file found'});
            }
        }).catch((error) => {
            console.log(error);
        })
    }



};
module.exports = jsonHandling;