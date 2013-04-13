/* jshint node:true */
/* global modules:false */

modules.define(
    'yana:cluster',
    ['inherit', 'yana:util', 'yana:logger', 'yana:config'],
    function(provide, inherit, util, logger, config) {

var workers = {};

provide(inherit({

    __constructor : function(params) {
        this._params = util.extend(this.getDefaultParams(), params);
    },

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
            cluster = this.__self._cluster;

        logger.debug('Going to start %d Workers', nworkers);

        while(nworkers--) {
            this._createWorker();
        }

        cluster
            .on('fork', this._onWorkerFork.bind(this))
            .on('listening', this._onWorkerListening.bind(this))
            .on('death', this._onWorkerDeath.bind.bind(this))
            .on('exit', this._onWorkerExit.bind.bind(this));

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
            logger.debug('Worker taking too long to start');
        }, this._params.timeout);
    },

    _onWorkerListening : function(worker) {
        clearTimeout(workers[worker.id].timeout);
    },

    _onWorkerExit : function(worker) {
        logger.debug('Worker %d exit', this._getWorkerPid(worker));
        clearTimeout(timeouts[worker.id].timeout);

        if(!worker.suicide) {
            logger.debug('Worker %d died, forking new one', this._getWorkerPid(worker));
            this.__self._cluster.fork();
        }
    },

    _onWorkerDeath : function(worker) {
        logger.debug('Worker %d died', this._getWorkerPid(worker));
        clearTimeout(timeouts[worker.id || worker.pid].timeout);
    },

    _getWorkerId : function(worker) {
        return worker.id || worker.pid;
    },

    _getWorkerPid : function(worker) {
        return worker.process? worker.process.pid : worker.pid;
    },

    getDefaultParams : function() {
        return {
            workers : cofig.node.workers,
            timeout : 2000
        };
    }

}, {

    _cluster : require('cluster'),

    _workers : workers

}));

});