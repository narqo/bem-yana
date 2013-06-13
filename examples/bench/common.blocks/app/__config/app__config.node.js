modules.define(
    'yana-config',
    ['yana-util'],
    function(provide, util, config) {

config.app.port = 8081;
config.app.workers = require('os').cpus().length - 2;

provide(config);

});
