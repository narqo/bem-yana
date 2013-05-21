/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-http',
    ['inherit', 'yana-logger'],
    function(provide, inherit, logger, Http) {

var DOMAIN = require('domain');

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
        req.on('close', function() {
            req.domain.dispose();
        });

        this.__base.apply(this, arguments);
    }

}));

});
