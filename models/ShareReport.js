var urine = require('../app/models/Urine');
var blood = require('../app/models/Blood');
var Hospital = require('../app/models/Hospital');
var nodemailer = require('nodemailer');
var mkdirp = require('mkdirp');
var hinfo = require('../app/models/HospitalInfo');
var human = require('../app/models/Human');
var pet = require('../app/models/Pet');

const pdfshift = require('pdfshift')('735235523910400c944a9e923ac44ffd');//735235523910400c944a9e923ac44ffd,9b06e5eda13444a2a38d39e6fb965c06
const fs = require('fs');

//console.log(calculate_age(new Date(1995,5,24)));
var dateTime = require('node-datetime');
var Share={
    shareReport: (userParam,callback) =>{
        let rinf;
        let pass;
        let part1 = "<html>\n" +
            "<head>\n" +
            "\t<title>SpectroChip</title>\n" +
            "\t</head>\n" +
            "<body style=\"font-family: arial;height: 100%;width: 100%;padding: 0;margin: 0\">\n" +
            "   <table id=\"customers\" border=\"0\" cellspacing=\"0\" cellpadding=\"0px\" width=\"100%\" style=\"font-family: &quot;Trebuchet MS&quot;, Arial, Helvetica, sans-serif;display: inline-table;border-collapse: collapse;width: 100%;margin-left: 0;margin-top: 0px;margin-right: 0px;margin-bottom: 15px\">\n" +
            "\t\t\t\t<thead style=\"font-family: arial\">\n" +
            "\t\t\t\t\t<tr bgcolor=\"#0074d9\" style=\"font-family: arial;background-color: #f2f2f2\">\n" +
            "\t\t\t\t\t\t<th colspan=\"0\" cellpadding=\"0\" style=\"padding: 45px;border: none;color: white;font-size: 25px;font-family: arial;padding-top: 22px;padding-bottom: 22px;text-align: center;background-color: #3F51B5\">SpectroCare Test Report</th>\n" +
            "\t\t\t\t\t</tr>\n" +
            "\t\t\t\t</thead>\n" +
            "       </table>\n" +
            "\t<div class=\"mainWrapper\" style=\"font-family: arial;width: 800px;margin: 0 auto\">\n" +
            "\t\t<div class=\"part1\" style=\"font-family: arial;width: 800px;margin: 0 auto;height: 150px\">\n" +
            "\t\t\t<div id=\"subDiv1\" style=\"font-family: arial;width: 300px;float: left;height: 150px\">\n" +
            "\t\t\t\t<figure style=\"font-family: arial\">\n" +
            "\t\t\t\t\t<img src=\"http://18.204.210.99/files/ri_13.png\" alt=\"\" style=\"font-family: arial\"/>\n" +
            "\t\t\t\t</figure>\n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div id=\"subDiv2\" style=\"font-family: arial;width: 350px;float: right;text-align: right;line-height: 1.8;height: 150px\">\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\"> SpectroChip, Inc</b></span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\">Phone: 03-552-0892</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\">No.951, Fuxing Rd., Zhubei City,</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\">Hsinchu County 302, Taiwan (R.O.C.)</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\">www.spectrochips.com</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div> <!-- Part one Ends here -->\n" +
            "\t\t<div class=\"clear\" style=\"font-family: arial\"> <hr style=\"font-family: arial\"/> </div>\n" +
            "\n" +" <br style=\"font-family: arial\"/>\n" +
            "\t\t<div style=\"font-family: arial;text-align: center;\"><b style=\"font-family: arial;\">Reffered By:</b> #person </div><br style=\"font-family: arial\"/>\n "+
            "\t\t<div class=\"part2\" style=\"font-family: arial;width: 960px;margin-top: 20px\">\n" +
            "\t\t\t<div id=\"p2sub1\" style=\"font-family: arial;line-height: 1.5;margin-left: 20px;width: 31%;height: 150px;float: left\">\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Date:</b> #date</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Name:</b> #name</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Height:</b> #height </span><br style=\"font-family: arial\"/>\n" +
            //"\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Fasting:</b> #fasting </span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div id=\"p2sub2\" style=\"font-family: arial;line-height: 1.5;margin-left: 20px;width: 31%;height: 150px;float: left\">\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Time:</b> #time</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Gender:</b> #gender</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Weight:</b> #weight </span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div id=\"p2sub3\" style=\"font-family: arial;line-height: 1.5;margin-left: 20px;width: 31%;float: right;height: 150px\">\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Blood Type:</b> #blood </span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">Age:</b> #age</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<br style=\"font-family: arial\"/>\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><b style=\"font-family: arial\">BMI:</b> 27.7(over weight)</span><br style=\"font-family: arial\"/>\n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div class=\"picGrp\" style=\"font-family: arial;width: 800px;text-align: right\">\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><img src=\"http://18.204.210.99/files/images/happy.png\" alt=\"\" style=\"font-family: arial;margin-left: 60px;position: relative;height: 30px;width: 30px;top: 6px;left: 2px\"/>:Normal </span>\n" +
            "\t\t\t\t<span style=\"font-family: arial\"><img src=\"http://18.204.210.99/files/images/sad.png\" alt=\"\" style=\"font-family: arial;margin-left: 60px;position: relative;height: 30px;width: 30px;top: 6px;left: 2px\"/> :Abnormal</span>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div> <!-- Part 2 ends here -->\n" +
            "\n" +
            "\t\t<div class=\"part3\" style=\"font-family: arial\">\n" +
            "\t\t\t<table border=\"1\" cellspacing=\"0\" cellpadding=\"10px\" width=\"800px\" style=\"font-family: arial;margin-top: 20px;margin-left: 40px;float: right;text-align: center;font-weight: 600\">\n" +
            "\t\t\t\t<thead style=\"font-family: arial\">\n" +
            "\t\t\t\t\t<tr bgcolor=\"#0074d9\" style=\"font-family: arial\">\n" +
            "\t\t\t\t\t\t<th colspan=\"5\" cellpadding=\"10\" style=\"padding: 15px;border: none;color: white;font-size: 25px;font-family: arial\">Urine Test Report</th>\n" +
            "\t\t\t\t\t</tr>\n" +
            "\t\t\t\t</thead>\n" +
            "\t\t\t\t<tbody style=\"font-family: arial\">\n" +
            "\t\t\t\t\t<tr style=\"font-family: arial\">\n" +
            "\t\t\t\t\t\t<th style=\"font-family: arial\">Test Item</th>\n" +
            "\t\t\t\t\t\t<th style=\"font-family: arial\">Value</th>\n" +
            "\t\t\t\t\t\t<th style=\"font-family: arial\">Result</th>\n" +
            "\t\t\t\t\t\t<th style=\"font-family: arial\">Flag</th>\n" +
            "\t\t\t\t\t\t<th style=\"font-family: arial\">Health Reference Ranges</th>\n" +
            "\t\t\t\t\t</tr>";

        function calculate_age(birthday) {
            var diff_ms = Date.now() - birthday.getTime();
            var age_dt = new Date(diff_ms);

            return Math.abs(age_dt.getUTCFullYear() - 1970);
        }

           var date = Date.now();

           hinfo.findOne({username: new RegExp(userParam.username,'i')})
                .exec()
                .then((pers) => {

                    if (userParam.clientType === "Human") {

                        human.findOne({username: new RegExp(userParam.username, 'i') , clientId:userParam.clientId})
                            .exec()
                            .then((humaninfo) => {

                                rinf = humaninfo;
                                pass = rinf.birthday;
                                console.log('HumanFound...');
                                let dt = dateTime.create();
                                part1 = part1.replace("#name", humaninfo.name);
                                part1 = part1.replace("#date", dt.format('Y/m/d'));
                                part1 = part1.replace("#time", dt.format('H:M:S'));
                                part1 = part1.replace("#gender", humaninfo.gender);
                                part1 = part1.replace("#blood", humaninfo.bloodType);
                                part1 = part1.replace("#weight", humaninfo.weight);
                                part1 = part1.replace("#height", humaninfo.height);
                                part1 = part1.replace("#age", calculate_age(new Date(humaninfo.birthday.slice(0, 4), humaninfo.birthday.slice(5, 6), humaninfo.birthday.slice(7, 9))));
                                part1 = part1.replace("#person", pers.name);

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    }
                    else if (userParam.clientType === "Pet") {

                        pet.findOne({username: new RegExp(userParam.username, 'i') , clientId:userParam.clientId})
                            .exec()
                            .then((petinfo) => {

                                rinf = petinfo;
                                pass = rinf.birthday;
                                console.log('PetFound...');
                                let dt = dateTime.create();
                                part1 = part1.replace("#name", petinfo.petName);
                                part1 = part1.replace("#date", dt.format('Y/m/d'));
                                part1 = part1.replace("#time", dt.format('H:M:S'));
                                part1 = part1.replace("#gender", petinfo.gender);
                                part1 = part1.replace("#blood", petinfo.bloodGroup);
                                part1 = part1.replace("#weight", petinfo.weight);
                                part1 = part1.replace("#height", petinfo.height);
                                part1 = part1.replace("#age", calculate_age(new Date(petinfo.birthday.slice(0, 4), petinfo.birthday.slice(5, 6), petinfo.birthday.slice(7, 9))));
                                part1 = part1.replace("#person", pers.name);

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    }

                })
            .catch((error) => {
                console.log(error);
            });

        Hospital.findOne({username: new RegExp(userParam.username,'i')})
            .exec()
            .then((doc) => {
                console.log('HospitalFound...');
                if(doc === null){
                    callback({response:"0",message:"No Hospital found"});
                }else {

                    if (userParam.clientType === "Human") {
                        human.findOne({username: new RegExp(userParam.username, 'i') , clientId:userParam.clientId})
                            .exec()
                            .then((humaninfo) => {

                                    urine.findOne({
                                        username: new RegExp(userParam.username, 'i'),
                                        testId: userParam.testId,
                                        clientType: userParam.clientType,
                                        client_Id: userParam.clientId
                                    })
                                        .exec()
                                        .then((urinedocs) => {

                                            if (urinedocs) {

                                            console.log('urine docs...', urinedocs);
                                            urine.updateOne({testId: userParam.testId}, {$set: {isShared: true}}, function (er, suc) {
                                                if (er) {
                                                    console.log(er);
                                                } else {
                                                    console.log(suc);
                                                }
                                            });

                                            //part1 += part1.replace("#fasting", urinedocs.isFasting);

                                            for (let i = 0; i < urinedocs.testFactors.length; i++) {
                                                if (urinedocs.testFactors[i].flag) {
                                                    let urlh = 'http://18.204.210.99/files/images/happy.png'
                                                    part1 += "<tr style=\"font-family: arial\">\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urlh + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                        "\t\t\t\t\t</tr>";
                                                } else {
                                                    let urls = 'http://18.204.210.99/files/images/sad.png'
                                                    part1 += "<tr style=\"font-family: arial\">\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urls + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                        "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                        "\t\t\t\t\t</tr>";
                                                }

                                            }
                                            part1 += "</tbody>\n" +
                                                "\t\t\t</table>\n" +
                                                "\t\t</div>\n" +
                                                "\t</div>\n" +
                                                "</body>\n" +
                                                "</html>";

                                            var transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                    user: 'contact.spectrum.in@gmail.com',
                                                    pass: 'vedas2017'
                                                }
                                            });

                                            var mailOptions;

                                            mkdirp('./pdf/urine/human/' + date + humaninfo.name, function (err) {
                                                // if any errors then print the errors to our console
                                                if (err) console.log(err);
                                                // else print a success message.
                                                console.log("Successfully created pdf directory");
                                            });

                                            const inPath = './pdf/urine/human/' + date + humaninfo.name + '/' + 'test results.pdf';
                                            pdfshift
                                                .prepare(part1).protect({
                                                user_password: pass,
                                                owner_password: 'owner',
                                                no_print: false
                                            }).convert().then(function (binary_file) {
                                                fs.writeFile(inPath, binary_file, "binary", function (err, suc) {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    else {
                                                        mailOptions = {
                                                            from: 'contact.spectrum.in@gmail.com',
                                                            to: humaninfo.email,
                                                            subject: 'Human Urine Test Report',
                                                            html: part1,
                                                            attachments: [{   // filename and content type is derived from path
                                                                path: inPath
                                                            }],
                                                        }

                                                        transporter.sendMail(mailOptions, function (error, info) {
                                                            if (error) {
                                                                console.log(error);
                                                            } else {
                                                                console.log('Email sent: ' + info.response);
                                                                callback({
                                                                    response: '3',
                                                                    message: 'report has been successfully shared'
                                                                })

                                                            }
                                                        })
                                                    }
                                                })
                                            }).catch(function ({message, code, response, errors = null}) {
                                                if (message)
                                                    console.log(message);
                                                //res.render('index',{title:message})
                                                else if (code)
                                                    console.log(code);
                                                else if (response)
                                                    console.log(response);
                                                else
                                                    console.log(errors);
                                            });

                                        }
                                        else {

                                                blood.findOne({
                                                    username: new RegExp(userParam.username, 'i'),
                                                    testId: userParam.testId,
                                                    clientType:userParam.clientType,
                                                    client_Id:userParam.clientId
                                                })
                                                    .exec()
                                                    .then((urinedocs) => {
                                                        console.log('blood docs...', urinedocs);
                                                        blood.updateOne({testId: userParam.testId},{$set:{isShared:true}}, function (er,suc) {
                                                            if(er){
                                                                console.log(er);
                                                            }else{
                                                                console.log(suc);
                                                            }
                                                        });

                                                        //part1 += part1.replace("#fasting", urinedocs.isFasting);

                                                        for (let i = 0; i < urinedocs.testFactors.length; i++) {
                                                            if (urinedocs.testFactors[i].flag) {
                                                                let urlh = 'http://18.204.210.99/files/images/happy.png'
                                                                part1 += "<tr style=\"font-family: arial\">\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urlh + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                                    "\t\t\t\t\t</tr>";
                                                            }else{
                                                                let urls = 'http://18.204.210.99/files/images/sad.png'
                                                                part1 += "<tr style=\"font-family: arial\">\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urls + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                                    "\t\t\t\t\t</tr>";
                                                            }

                                                        }
                                                        part1 += "</tbody>\n" +
                                                            "\t\t\t</table>\n" +
                                                            "\t\t</div>\n" +
                                                            "\t</div>\n" +
                                                            "</body>\n" +
                                                            "</html>";

                                                        var transporter = nodemailer.createTransport({
                                                            service: 'gmail',
                                                            auth: {
                                                                user: 'contact.spectrum.in@gmail.com',
                                                                pass: 'vedas2017'
                                                            }
                                                        });

                                                        var mailOptions;

                                                        mkdirp('./pdf/blood/human/' + date +humaninfo.name, function (err) {
                                                            // if any errors then print the errors to our console
                                                            if (err) console.log(err);
                                                            // else print a success message.
                                                            console.log("Successfully created pdf directory");
                                                        });

                                                        const inPath = './pdf/blood/human/' + date + humaninfo.name + '/' + 'test results.pdf';
                                                        pdfshift
                                                            .prepare(part1).protect({
                                                            user_password: pass,
                                                            owner_password: 'owner',
                                                            no_print: false
                                                        }).convert().then(function (binary_file) {
                                                            fs.writeFile(inPath, binary_file, "binary", function (err, suc) {
                                                                if (err) {
                                                                    console.log(err);
                                                                }
                                                                else {
                                                                    mailOptions = {
                                                                        from: 'contact.spectrum.in@gmail.com',
                                                                        to: humaninfo.email,
                                                                        subject: 'Human Blood Test Report',
                                                                        html: part1,
                                                                        attachments: [{   // filename and content type is derived from path
                                                                            path: inPath
                                                                        }],
                                                                    }

                                                                    transporter.sendMail(mailOptions, function (error, info) {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        } else {
                                                                            console.log('Email sent: ' + info.response);
                                                                            callback({
                                                                                response: '3',
                                                                                message: 'report has been successfully shared'
                                                                            })

                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }).catch(function ({message, code, response, errors = null}) {
                                                            if (message)
                                                                console.log(message);
                                                            //res.render('index',{title:message})
                                                            else if (code)
                                                                console.log(code);
                                                            else if (response)
                                                                console.log(response);
                                                            else
                                                                console.log(errors);
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        console.log('error..', error);
                                                    })

                                            }

                                        })
                                        .catch((error) => {
                                            console.log('error..', error);
                                        })

                            }).catch((error) => {
                            console.log('error',error);
                        })
                    }

                    else  if (userParam.clientType === "Pet") {
                        pet.findOne({username: new RegExp(userParam.username, 'i') , clientId:userParam.clientId})
                            .exec()
                            .then((petinfo) => {

                                urine.findOne({
                                    username: new RegExp(userParam.username, 'i'),
                                    testId: userParam.testId,
                                    clientType: userParam.clientType,
                                    client_Id: userParam.clientId
                                })
                                    .exec()
                                    .then((urinedocs) => {

                                        if (urinedocs) {

                                        console.log('urine docs...', urinedocs);
                                        urine.updateOne({testId: userParam.testId}, {$set: {isShared: true}}, function (er, suc) {
                                            if (er) {
                                                console.log(er);
                                            } else {
                                                console.log(suc);
                                            }
                                        });

                                        //part1 += part1.replace("#fasting", urinedocs.isFasting);

                                        for (let i = 0; i < urinedocs.testFactors.length; i++) {
                                            if (urinedocs.testFactors[i].flag) {
                                                let urlh = 'http://18.204.210.99/files/images/happy.png'
                                                part1 += "<tr style=\"font-family: arial\">\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urlh + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                    "\t\t\t\t\t</tr>";
                                            } else {
                                                let urls = 'http://18.204.210.99/files/images/sad.png'
                                                part1 += "<tr style=\"font-family: arial\">\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urls + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                    "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                    "\t\t\t\t\t</tr>";
                                            }

                                        }
                                        part1 += "</tbody>\n" +
                                            "\t\t\t</table>\n" +
                                            "\t\t</div>\n" +
                                            "\t</div>\n" +
                                            "</body>\n" +
                                            "</html>";

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: 'contact.spectrum.in@gmail.com',
                                                pass: 'vedas2017'
                                            }
                                        });

                                        var mailOptions;

                                        mkdirp('./pdf/urine/pet/' + date + petinfo.petName, function (err) {
                                            // if any errors then print the errors to our console
                                            if (err) console.log(err);
                                            // else print a success message.
                                            console.log("Successfully created pdf directory");
                                        });

                                        const inPath = './pdf/urine/pet/' + date + petinfo.petName + '/' + 'test results.pdf';
                                        pdfshift
                                            .prepare(part1).protect({
                                            user_password: pass,
                                            owner_password: 'owner',
                                            no_print: false
                                        }).convert().then(function (binary_file) {
                                            fs.writeFile(inPath, binary_file, "binary", function (err, suc) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                else {
                                                    mailOptions = {
                                                        from: 'contact.spectrum.in@gmail.com',
                                                        to: petinfo.email,
                                                        subject: 'Pet Urine Test Report',
                                                        html: part1,
                                                        attachments: [{   // filename and content type is derived from path
                                                            path: inPath
                                                        }],
                                                    }

                                                    transporter.sendMail(mailOptions, function (error, info) {
                                                        if (error) {
                                                            console.log(error);
                                                        } else {
                                                            console.log('Email sent: ' + info.response);
                                                            callback({
                                                                response: '3',
                                                                message: 'report has been successfully shared'
                                                            })

                                                        }
                                                    })
                                                }
                                            })
                                        }).catch(function ({message, code, response, errors = null}) {
                                            if (message)
                                                console.log(message);
                                            //res.render('index',{title:message})
                                            else if (code)
                                                console.log(code);
                                            else if (response)
                                                console.log(response);
                                            else
                                                console.log(errors);
                                        });
                                    }
                                    else {

                                            blood.findOne({
                                                username: new RegExp(userParam.username, 'i'),
                                                testId: userParam.testId,
                                                clientType:userParam.clientType,
                                                client_Id:userParam.clientId
                                            })
                                                .exec()
                                                .then((urinedocs) => {
                                                    console.log('urine docs...', urinedocs);
                                                    blood.updateOne({testId: userParam.testId},{$set:{isShared:true}}, function (er,suc) {
                                                        if(er){
                                                            console.log(er);
                                                        }else{
                                                            console.log(suc);
                                                        }
                                                    });

                                                    //part1 += part1.replace("#fasting", urinedocs.isFasting);

                                                    for (let i = 0; i < urinedocs.testFactors.length; i++) {
                                                        if (urinedocs.testFactors[i].flag) {
                                                            let urlh = 'http://18.204.210.99/files/images/happy.png'
                                                            part1 += "<tr style=\"font-family: arial\">\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urlh + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                                "\t\t\t\t\t</tr>";
                                                        }else{
                                                            let urls = 'http://18.204.210.99/files/images/sad.png'
                                                            part1 += "<tr style=\"font-family: arial\">\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].testName + "</td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].value + "</td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].result + "</td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\"><img src=" + urls + " alt=\"image\" style=\"font-family: arial;height: 40px;width: 40px\"/> </td>\n" +
                                                                "\t\t\t\t\t\t<td style=\"font-family: arial\">" + urinedocs.testFactors[i].healthReferenceRanges + "</td>\n" +
                                                                "\t\t\t\t\t</tr>";
                                                        }

                                                    }
                                                    part1 += "</tbody>\n" +
                                                        "\t\t\t</table>\n" +
                                                        "\t\t</div>\n" +
                                                        "\t</div>\n" +
                                                        "</body>\n" +
                                                        "</html>";

                                                    var transporter = nodemailer.createTransport({
                                                        service: 'gmail',
                                                        auth: {
                                                            user: 'contact.spectrum.in@gmail.com',
                                                            pass: 'vedas2017'
                                                        }
                                                    });

                                                    var mailOptions;

                                                    mkdirp('./pdf/blood/pet/' + date + petinfo.petName, function (err) {
                                                        // if any errors then print the errors to our console
                                                        if (err) console.log(err);
                                                        // else print a success message.
                                                        console.log("Successfully created pdf directory");
                                                    });

                                                    const inPath = './pdf/blood/pet/' + date + petinfo.petName + '/' + 'test results.pdf';
                                                    pdfshift
                                                        .prepare(part1).protect({
                                                        user_password: pass,
                                                        owner_password: 'owner',
                                                        no_print: false
                                                    }).convert().then(function (binary_file) {
                                                        fs.writeFile(inPath, binary_file, "binary", function (err, suc) {
                                                            if (err) {
                                                                console.log(err);
                                                            }
                                                            else {
                                                                mailOptions = {
                                                                    from: 'contact.spectrum.in@gmail.com',
                                                                    to: petinfo.email,
                                                                    subject: 'Pet Blood Test Report',
                                                                    html: part1,
                                                                    attachments: [{   // filename and content type is derived from path
                                                                        path: inPath
                                                                    }],
                                                                }

                                                                transporter.sendMail(mailOptions, function (error, info) {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    } else {
                                                                        console.log('Email sent: ' + info.response);
                                                                        callback({
                                                                            response: '3',
                                                                            message: 'report has been successfully shared'
                                                                        })

                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }).catch(function ({message, code, response, errors = null}) {
                                                        if (message)
                                                            console.log(message);
                                                        //res.render('index',{title:message})
                                                        else if (code)
                                                            console.log(code);
                                                        else if (response)
                                                            console.log(response);
                                                        else
                                                            console.log(errors);
                                                    });
                                                })
                                                .catch((error) => {
                                                    console.log('error..', error);
                                                })

                                        }

                                })
                                    .catch((error) => {
                                        console.log('error..', error);
                                    })

                        }).catch((error) => {
                            console.log('error',error);
                        })
                    }

                }
            })
            .catch((error) => {
                console.log('error',error);
            })
    }
};
module.exports=Share;