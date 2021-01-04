var nconf = require('nconf').file({file: 'config/config.json'});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./lib/logger');
var db = require('./lib/db');


var indexRouter = require('./controllers/index');

var app = express();


logger.config(nconf.get('loggerConfig'));
db.config(nconf.get("dbConfig").url, nconf.get("dbConfig").dbname);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/insurance', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(nconf.get('port'), () => {
  console.log("Express server listening on port " + nconf.get('port'));
  logger.msg("INFO","Express server listening on port " + nconf.get('port'))
});
