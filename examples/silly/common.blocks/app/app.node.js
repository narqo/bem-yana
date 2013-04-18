modules.define(
    'app',
    ['yana-http', 'yana-handler_type_common', 'yana-cluster', 'yana-config'],
    function(provide, Http, RequestHandler, Cluster, config) {

function init() {
    // TODO- params
    /*
    <handler>
        .addRoute({
            rule   - '/objects/{id}',
            action - 'objects',
            method - 'get',
            params - {
                'new' - true,
                'type' - ['one', 'two']
            }
        });
    */

    var app = new Http({ handlers : [ RequestHandler ] });
    return app;
}

provide(function() {
    var cluster = new Cluster(),
        app = init(),
        worker = app.run.bind(app);

    cluster.run(worker);
//    app.run();
});

});