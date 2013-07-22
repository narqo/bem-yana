/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-handler',
    ['inherit', 'vow', 'yana-view', 'yana-router', 'yana-logger', 'yana-error'],
    function(provide, inherit, Vow, View, router, logger, YanaError, Handler) {

provide(inherit(Handler, {

    dispatch : function(req) {
        logger.debug('Going to route "%s"', req.path);

        return router.resolve(req.path, req.method.toUpperCase());
    },

    _handleRequest : function(req, res) {
        var route = this.dispatch(req);

        logger.debug('Route dispatched %j', route);

        return Vow.invoke(this.handleRequest.bind(this), req, res, route)
            .fail(function(err) {
                // FIXME: ugly!
                if(err instanceof YanaError) {
                    throw err;
                }

                var fallback = router.__self.ACTIONS.INTERNAL_ERROR;

                logger.warning('Error catched, going to fallback \\w "%s"', fallback);

                route.data.action = fallback;
                route.params.error = err;

                return this.handleRequest(req, res, route);
            }, this);
    },

    handleRequest : function(req, res, route) {
        var action = route.data.action;
        req.route = route;

        return View.create(action, req, res, route.path, route.params)._run();
    }

}));

});
