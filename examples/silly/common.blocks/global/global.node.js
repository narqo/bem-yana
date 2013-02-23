exports.main = main;

function main() {
    App.Config.params({

        routes : [
            { rule : '/', action : 'page' },
            { rule : '/albums', action : 'page' },
            { rule : '/albums/{id}', action : 'page' },
        ]

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
    app.run(App.Config.param('node').port);
};
