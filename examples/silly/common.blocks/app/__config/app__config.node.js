modules.define(
    'yana-config',
    ['yana-util'],
    function(provide, util, config) {

config.app.workers = require('os').cpus().length - 1;

provide(util.extend(config, {

    debug : true,

    logger : {
        level : 'debug'
    },

    static_root : require('path').resolve(__dirname),

    static_url  : '/m/'

}));

});
