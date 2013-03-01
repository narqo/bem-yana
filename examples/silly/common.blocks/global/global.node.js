exports.main = main;

function main() {
    var config = App.Config;

    config.params({

        routes : [
            { rule : '/$', action : 'page' },
            { rule : '/albums', action : 'page' },
            { rule : '/albums/{id}', action : 'page' },
            { rule : '/m', action : 'static' },
            { rule : '/.*\.js$', action : 'static' },
            { rule : '/favicon.ico', action : 'static' }
        ]

    });

    config.param('DEBUG', true);

    config.params({
        STATIC_ROOT : require('path').resolve(__dirname),
        STATIC_URL  : ''
    });

    // TODO: method, params
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

    var app = new App.Http();
    app.run();
};
