exports.config = Yana.Config;
exports.init = init;
exports.main = main;


function init() {
    var config = Yana.Config;

    config.params({

        routes : [
            { rule : '/', action : 'page' },
            { rule : '/alb', action : 'page', methods : ['post', 'get'] },
            { rule : '/albums', action : 'page' },
            { rule : '/albums/{id}', action : 'page' },
            { rule : '/m', action : 'static' },
            { rule : '/.*\\.js$', action : 'static' },
            { rule : '/favicon.ico', action : 'static' }
        ]

    });

    config.params({
        DEBUG : true,
        STATIC_ROOT : require('path').resolve(__dirname),
        STATIC_URL  : '/m/'
    });

    // TODO: params
    /*
    <handler>
        .addRoute({
            rule   : '/objects/{id}',
            action : 'objects',
            method : 'get',
            params : {
                'new' : true,
                'type' : ['one', 'two']
            }
        });
    */

    var app = new Yana.Http();
    return app;
}

function main() {
    Yana.Config.param('NODE').workers = require('os').cpus().length - 1;

    var cluster = new Yana.Cluster(),
        app = init(),
        worker = app.run.bind(app);

    cluster.run(worker);
//    app.run();
}
