/**
 * Cluster block, redefined for Node.js 0.6.x
 */

Yana.Cluster = inherit(Yana.Cluster, {

    stop : function() {
        var workers = this.__self._workers;
        Object.keys(workers).forEach(function(id) {
            workers[id].worker.kill();
        });
        process.exit(1);
    }

});
