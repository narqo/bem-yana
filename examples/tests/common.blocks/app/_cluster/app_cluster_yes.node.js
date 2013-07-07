modules.define('app', ['yana-cluster'], function(provide, Cluster, app) {

var cluster = new Cluster();
provide(function() {
    cluster.run(app);
});

});
