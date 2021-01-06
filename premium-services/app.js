const nconf = require('nconf').file({file: 'config/config.json'});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./lib/logger');
const db = require('./lib/db');
const cors = require('cors')

var indexRouter = require('./controllers/index');

var app = express();

app.use(cors());
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
