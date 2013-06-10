/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-http',
    ['inherit', 'yana-logger', 'yana-error'],
    function(provide, inherit, logger, YanaError, Http) {

var CLUSTER = require('cluster'),
    DOMAIN = require('domain'),

    assert = require('assert').ok;

provide(inherit(Http, {

    _onRequest : function(req, res) {
        var domain = DOMAIN.create(),
            onRequest = this.__base.bind(this, req, res);

        domain.on('error', this._onError.bind(this, req, res));

        domain.add(req);
        domain.add(res);

        domain.run(onRequest);
    },

    _onError : function(req, res, err) {
        var domain = req.domain,
            onError = this.__base.bind(this);

        // TODO: why do we need this stuff?
        // @see https://github.com/isaacs/npm-www/blob/master/decorate.js
        delete err.domain;

        // FIXME: it's seems like ugly hack!
        if(err instanceof YanaError) {
            // Ok, this is yana-error, so we know what to do
            onError(req, res, err);
            return;
        }

        try {
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

            // @see https://github.com/ether/etherpad-lite/issues/1541 for @isaacs notes
            logger.debug('Does socket still live?');
            assert(!req.socket.destroyed, 'Socket was already destroyed');

            res.on('finish', function() {
                logger.debug('Response was finished, disposing domain stuff');
                domain.dispose();
            });

            onError(req, res, err);
        } catch(newerr) {
            logger.critical('Error sending proper error status for "%s"', req.url, newerr);
            domain.dispose();
        }
    }

}));

});
