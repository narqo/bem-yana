exports.main = main;

function main() {
    App.Config.params({

        routes : [
            { rule : '/', action : 'page' },
            { rule : '/albums', action : 'page' },
            { rule : '/albums/{id}', action : 'page' },
        ]

    });

    (new App.Http())
        .start(App.Config.param('node').port);
};
