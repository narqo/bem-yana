/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-http',
    ['inherit', 'yana-logger'],
    function(provide, inherit, logger, Http) {

var CLUSTER = require('cluster'),
    DOMAIN = require('domain');

provide(inherit(Http, {

    _onRequest : function(req, res) {
        var reqd = DOMAIN.create();

        reqd.add(req);
        reqd.add(res);

        reqd.on('error', this._onError.bind(this, req, res));

        reqd.run(function() {
            this.__base.call(this, req, res);
        }.bind(this));
    },

    _onError : function(req, res, err) {
        if(CLUSTER.worker) {
            // FIXME: hardcoded killtimer value
            var killtimer = setTimeout(function() {
                logger.debug('Closing down');
                process.exit(1);
            }, 2000);

            // @see http://nodejs.org/api/all.html#all_warning_don_t_ignore_errors
            killtimer.unref();

            // stop taking new requests
            this.stop();

            /*
            Let the master know we're dead.  This will trigger a
            `disconnect` in the cluster master, and then it will fork
            a new worker.
            */
            logger.debug('It seems that we\'re in cluster, disconnecting');

            CLUSTER.worker.disconnect();
        }

        req.on('close', function() {
            req.domain.dispose();
        });

        this.__base.apply(this, arguments);
    }

}));

});
