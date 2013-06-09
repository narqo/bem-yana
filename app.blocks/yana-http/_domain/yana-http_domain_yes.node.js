/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-http',
    ['inherit', 'yana-logger', 'yana-error'],
    function(provide, inherit, logger, YanaError, Http) {

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
        var base = this.__base,
            reqd = req.domain;

        // FIXME: it's seems like ugly hack!
        if(err instanceof YanaError) {
            // Ok, this is our error, we know what to do
            return base(req, res, err);
        }

        // Anything can happen now! Be very careful!

        try {
            logger.debug('Disposing domain stuff');
            reqd.dispose();

            if(CLUSTER.isWorker) {
                // @see http://nodejs.org/api/all.html#all_warning_don_t_ignore_errors
                logger.debug('It seems that we\'re in cluster, disconnecting');

                // stop taking new requests
                this.stop();

                // Let the master know we're dead.
                // This will trigger a `disconnect` in the cluster master,
                // and then it will fork a new worker
                CLUSTER.worker.disconnect();
            }

            base(req, res, err);
        } catch(newerr) {
            logger.critical('Error sending proper error status for "%s"', req.url, newerr);
            reqd.dispose();
        }
    }

}));

});
