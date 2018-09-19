'use strict';
const winston = require('winston');
const Props = require('../util/api-properties');
const tsFormat = () => (new Date()).toISOString();
const fs = require('fs');
const logDir = Props.logger.path;
require('winston-daily-rotate-file');
winston.emitErrs = true;


if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
let logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            level: 'info',
            filename: logDir+'givazon.log',
            prepend: true,
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            timestamp: tsFormat,
            prettyPrint: true,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
