const nconf = require('nconf').file({file: 'config/config.json'});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./lib/logger');
const db = require('./lib/db');
const indexRouter = require('./controllers/index');
const cors = require('cors');

var app = express();

var corsOptions = {
  origin: 'http://localhost:8001',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));
logger.config(nconf.get('loggerConfig'));
db.config(nconf.get("dbConfig").url, nconf.get("dbConfig").dbname);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/payment', indexRouter);


app.listen(nconf.get('port'), () => {
  console.log("Express server listening on port " + nconf.get('port'));
  logger.msg("INFO","Express server listening on port " + nconf.get('port'))
});
