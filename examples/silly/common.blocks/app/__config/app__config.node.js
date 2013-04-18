modules.define(
    'yana-config',
    ['yana-util'],
    function(provide, util, config) {

var routes = [
        { rule : '/', action : 'page' },
        { rule : '/alb', action : 'page', methods : ['post', 'get'] },
        { rule : '/albums', action : 'page' },
        { rule : '/albums/{id:\\d+}', action : 'page' },
        { rule : '/m', action : 'static' },
        { rule : '/.*\\.js$', action : 'static' },
        { rule : '/favicon.ico', action : 'static' }
    ];

config.app.workers = require('os').cpus().length - 1;

config.routes = routes;

provide(util.extend(config, {

    debug : true,

    static_root : require('path').resolve(__dirname),

    static_url  : '/m/'

}));

});
