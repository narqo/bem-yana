/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-cluster',
    ['inherit', 'yana-util', 'yana-logger', 'yana-config'],
    function(provide, inherit, util, logger, config) {

var FS = require('fs'),
    workers = {};

provide(inherit({

    __constructor : function(params) {
        this._params = util.extend(this.getDefaultParams(), params);

        this._isMaster = this.__self._cluster.isMaster;
    },

    /**
     * @param {Function} exec
     */
    run : function(exec) {
        this._isMaster? this._init() : exec();
    },

    stop : function() {
        var wrks = this.__self._cluster.workers;

        Object.keys(wrks).forEach(function(id) {
            wrks[id].destroy();
        });
    },

    _init : function() {
        var nworkers = this._params.workers,
            cluster = this.__self._cluster,
            socket = config.app.socket;

        if(socket) {
            logger.debug('Trying unlink socket "%s" first', socket);
            try {
                FS.unlinkSync(socket);
            } catch(e) {}
        }

        logger.debug('Going to start %d Workers', nworkers);

        while(nworkers--) {
            this._createWorker();
        }

        cluster
            .on('fork', this._onWorkerFork.bind(this))
            .on('listening', this._onWorkerListening.bind(this))
            .on('disconnect', this._onWorkerDisconnect.bind(this))
            .on('death', this._onWorkerDeath.bind(this))
            .on('exit', this._onWorkerExit.bind(this));

        // NOTE: make cluster and supervisor play nicely together
        // see https://github.com/isaacs/node-supervisor/issues/40 for details
        if(process.env.NODE_HOT_RELOAD == 1) {
            ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(function(signal) {
                process.on(signal, this.stop.bind(this));
            }, this);
        }
    },

    _createWorker : function() {
        var worker = this.__self._cluster.fork(),
            id = this._getWorkerId(worker),
            pid = this._getWorkerPid(worker);

        logger.info('Starting Worker %d (PID): %d', id, pid);

        workers[id] = {
            worker : worker
        };

        return worker;
    },

    _onWorkerFork : function(worker) {
        worker.birth = Date.now();

        Object.defineProperty(worker, 'age', {
            get : function() {
                return Date.now() - this.birth;
            },
            enumerable : true,
            configurable: true
        });

        workers[worker.id].forkTimer = setTimeout(function() {
            logger.error('Worker takes too long to start');
        }, this._params.timeout);
    },

    _onWorkerListening : function(worker, address) {
        logger.debug('Worker connected to %s:%s', address.address, address.port);

        clearTimeout(workers[worker.id].forkTimer);
    },

    _onWorkerExit : function(worker) {
        logger.debug('Worker %d exit', this._getWorkerPid(worker));

        clearTimeout(workers[worker.id].disconnectTimer);

        if(!worker.suicide) {
            logger.wa('Worker %d died abnormally', this._getWorkerPid(worker));

            var minRestartAge = this._params.minRestartAge;
            if(worker.age < minRestartAge) {
                setTimeout(this._createWorker.bind(this), minRestartAge);
                return;
            }
        }

        this._createWorker();
    },

    _onWorkerDisconnect : function(worker) {
        logger.debug('Worker %d disconnect', this._getWorkerPid(worker));

        var id = worker.id;

        clearTimeout(workers[id].forkTimer);

        // give it some time to shut down gracefully, or kill
        workers[id].disconnectTimer = setTimeout(function() {
            logger.debug('Closing down');
            worker.process.kill('SIGKILL');
        }, this._params.disconnectTimeout)
    },

    _onWorkerDeath : function(worker) {
        logger.error('Worker %d died', this._getWorkerPid(worker));

        clearTimeout(workers[worker.id].forkTimer);
    },

    _getWorkerId : function(worker) {
        return worker.id || worker.pid;
    },

    _getWorkerPid : function(worker) {
        return worker.pid || (worker.pid = worker.process.pid);
    },

    getDefaultParams : function() {
        return {
            workers : config.app.workers,
            timeout : 2000,
            disconnectTimeout : 2000,
            minRestartAge : 2000
        };
    }

}, {

    _cluster : require('cluster'),

    _workers : workers

}));

});