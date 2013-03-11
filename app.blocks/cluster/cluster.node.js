(function() {

Yana.Cluster = inherit({

    __constructor : function(params) {
        this._params = Yana.Util.merge(this._getDefaultParams(), params);
    },

    run : function(worker) {
        this.__self._cluster.isMaster?
            this._init() : worker();
    },

    _init : function() {
        var nworkers = this._params.workers,
            cluster = this.__self._cluster;

        Yana.Logger.debug('Going to start %d Workers', nworkers);

        while(nworkers--) {
            var worker = cluster.fork(),
                pid = this._getWorkerPid(worker);

            Yana.Logger.info('Starting Worker (PID): %d', pid);
        }

        cluster.on('exit', function(worker, code, signal) {
            if(!worker.suicide) {
                Yana.Logger.debug('Worker %d died, forking new one', this._getWorkerPid(worker));
                cluster.fork();
            }
        });
    },

    _getWorkerPid : function(worker) {
        return worker.process? worker.process.pid : worker.pid;
    },

    _getDefaultParams : function() {
        return {
            workers : Yana.Config.param('NODE').workers
        };
    }

}, {

    _cluster : require('cluster')

});

}());