const log4js = require('log4js');

log4js.configure({
    appenders: {
        errors: {type: "file", filename: 'logs/errors.log'},
        http: {type: "file", filename: 'logs/http.log'},
        console: {type: "console"}
    },
    categories: {
        default: {
            appenders: ['console'], level: 'error'
        },
        errors: {
            appenders: ['errors'], level: 'error'
        },
        http: {
            appenders: ['http'], level: 'all'
        }
    }
});

module.exports = log4js;