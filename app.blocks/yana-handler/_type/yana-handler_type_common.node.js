/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-handler',
    ['inherit', 'yana-request', 'yana-view', 'yana-router', 'yana-config', 'yana-logger'],
    function(provide, inherit, Request, View, router, config, logger, Handler) {

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
                logger.warning('Error catched, going to fallback');

                // FIXME: hardcode
                route.data.action = 'internal-error';
                route.params.error = err;

                return this.handleRequest(req, res, route);
            }.bind(this));
    },

    handleRequest : function(req, res, route) {
        var action = route.data.action;
        req.route = route;

        return View.create(action, req, res, route.path, route.params)._run();
    }

}));

});
