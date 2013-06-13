modules.define(
    'yana-config',
    ['yana-util'],
    function(provide, util, config) {

var workers = require('os').cpus().length - 2;

config.app.port = 8081;
config.app.workers = workers < 1? 1 : workers;

provide(config);

});
