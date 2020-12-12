const SimpleNodeLogger = require('simple-node-logger');

var opts = {
    logDirectory: __dirname ,
    fileNamePattern: 'storelog-<date>.log',
    dateFormat:'YYYY.MM.DD',
    
};


log = SimpleNodeLogger.createRollingFileLogger( opts );
log.setLevel('all');

const LoggerType = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    DEBUG: 'debug',
    ALL: 'all'
}


class Logger {

    static log(data, type = LoggerType.INFO) {
        log[type](data);
    }

    static setLevel (type) {
        log.setLevel(type);
    }
}

module.exports = {Logger, LoggerType};