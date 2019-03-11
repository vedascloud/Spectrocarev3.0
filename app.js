var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var registerRouter = require('./routes/Register');
var verifyRouter = require('./routes/Verify');
var hospitalInfoRouter = require('./routes/HospitalInformation');
var loginRouter = require('./routes/Login');
var forgetRouter = require('./routes/Forgetpassword');
var setpassRouter = require('./routes/Setpassword');
var changepasswordRouter = require('./routes/Chnagepassword');
var singoutRouter = require('./routes/Singout');
var langRouter = require('./routes/Languagejson');
var gethospitalRouter = require('./routes/Gethospital');

var humanRouter = require('./routes/Human');
var petRouter = require('./routes/Pet');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next){
    res.io = io;
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/spectrocare/register',registerRouter);
app.use('/spectrocare/verify',verifyRouter);
app.use('/spectrocare/hospitalinfo',hospitalInfoRouter);
app.use('/spectrocare/login',loginRouter);
app.use('/spectrocare/forgot',forgetRouter);
app.use('/spectrocare/newpassword',setpassRouter);
app.use('/spectrocare/changepassword', changepasswordRouter);
app.use('/spectrocare/logout',singoutRouter);
app.use('/spectrocare/lang',langRouter);
app.use('/spectrocare/hospital',gethospitalRouter);

app.use('/spectrocare/human',humanRouter);
app.use('/spectrocare/pet',petRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, server: server};
