/* jshint node:true */
/* global modules:false */

/**
 * Cluster block, redefined for Node.js 0.6.x
 */

modules.define(
    'yana-cluster',
    ['inherit'],
    function(provide, inherit, Cluster) {

provide(inherit(Cluster, {

    stop : function() {
        var workers = this.__self._workers;
        Object.keys(workers).forEach(function(id) {
            workers[id].worker.kill();
        });
        process.exit(1);
    }

}));

});
