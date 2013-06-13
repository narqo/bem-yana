modules.define(
    'app',
    ['yana-http', 'yana-handler', 'yana-cluster'],
    function(provide, Http, RequestHandler, Cluster) {

provide(function() {
    var app = new Http({ handlers : [ RequestHandler ] }),
        start = app.run.bind(app);

    start();

//    var cluster = new Cluster();
//    cluster.run(worker);
});

});