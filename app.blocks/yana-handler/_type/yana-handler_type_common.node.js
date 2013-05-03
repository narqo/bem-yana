/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-handler_type_common',
    ['inherit', 'yana-handler', 'yana-request', 'yana-view', 'yana-router', 'yana-config', 'yana-logger'],
    function(provide, inherit, Handler, Request, View, router, config, logger) {

provide(inherit(Handler, {

    dispatch : function(req) {
        logger.debug('Going to route "%s"', req.path);
        return router.resolve(req.path, req.method.toUpperCase());
    },

    _handleRequest : function(req, res) {
        var route = this.dispatch(req);

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
    }

}));

});