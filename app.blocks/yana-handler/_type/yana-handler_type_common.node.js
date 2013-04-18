/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-handler_type_common',
    ['inherit', 'yana-handler', 'yana-router', 'yana-view', 'yana-config', 'yana-logger'],
    function(provide, inherit, Handler, Router, View, config, logger) {

provide(inherit(Handler, {

    __constructor : function() {
        this._params = this.getDefaultParams();

        this._router = new Router(this._params.routes);
    },

    _handleRequest : function(req, res) {
        var route = this._router.dispatch(req);

        logger.debug('Route dispatched %j', route);

        return this.handleRequest(req, res, route)
            .fail(function(err) {
                logger.debug('Error catched, going to fallback');

                route.action = 'internal-error';
                route.params.error = err;
                return this.handleRequest(req, res, route);
            }.bind(this));
    },

    handleRequest : function(req, res, route) {
        return View.create(route.action, req, res, route.path, route.params)._run();
    },

    getDefaultParams : function() {
        return {
            routes : config.routes
        };
    }

}));

});