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
    },

    /**
     * @param {Function} worker
     */
    run : function(worker) {
        this.__self._cluster.isMaster?
            this._init() : worker();
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
        workers[worker.id].timeout = setTimeout(function() {
            logger.error('Worker taking too long to start');
        }, this._params.timeout);
    },

    _onWorkerListening : function(worker, address) {
        logger.debug('Worker connected to %s:%s', address.address, address.port);

        clearTimeout(workers[worker.id].timeout);
    },

    _onWorkerExit : function(worker) {
        logger.debug('Worker %d exit', this._getWorkerPid(worker));

        clearTimeout(workers[worker.id].timeout);

        // TODO: should really deal with cluster-workers-events
//        if(!worker.suicide) {
//            logger.debug('Worker %d died, forking new one', this._getWorkerPid(worker));
//            this._createWorker();
//        }
    },

    _onWorkerDisconnect : function(worker) {
        logger.debug('Worker %d disconnect, forking new one', this._getWorkerPid(worker));

        clearTimeout(workers[worker.id].timeout);
        this._createWorker();
    },

    _onWorkerDeath : function(worker) {
        logger.error('Worker %d died', this._getWorkerPid(worker));

        clearTimeout(workers[worker.id].timeout);
    },

    _getWorkerId : function(worker) {
        return worker.id || worker.pid;
    },

    _getWorkerPid : function(worker) {
        return worker.process? worker.process.pid : worker.pid;
    },

    getDefaultParams : function() {
        return {
            workers : config.app.workers,
            timeout : 2000
        };
    }

}, {

    _cluster : require('cluster'),

    _workers : workers

}));

});