var log4js = require('log4js');

var logger = () => {
var log = log4js.getLogger("payment");
return {
        config: (conf) => {
            console.log('logUtil: Logger configuration');
            log4js.configure(conf);
        },
        msg: (level, message) => {
            if (level === 'INFO') {
                log.info(message);
            } else if (level === 'DEBUG') {
                log.debug(message);
            } else if (level === 'TRACE') {
                log.trace(message);
            } else if (level === 'WARN') {
                log.warn(message);
            } else if (level === 'ERROR') {
                log.error(message);
            } else if (level === 'FATAL') {
                log.fatal(message);
            }
        }
    }
};
module.exports = logger();
    