modules.define(
    'app',
    ['yana-http', 'yana-handler', 'yana-cluster', 'yana-config'],
    function(provide, Http, RequestHandler, Cluster, config) {

function init() {
    var app = new Http({ handlers : [ RequestHandler ] });
    return app;
}

provide(function() {
    var cluster = new Cluster(),
        app = init(),
        worker = app.run.bind(app);

//    app.run();
    cluster.run(worker);
});

});