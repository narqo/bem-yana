/* jshint node:true */
/* global modules:false */

modules.define(
    'yana:handler_type_common',
    ['inherit', 'handler', 'router', 'view', 'config', 'logger'],
    function(provide, inherit, Handler, Router, View, config, logger) {

provide(inherit(Handler, {

    __constructor : function() {
        this._params = this.getDefaultParams();

        this._router = new (this.__self._getRoutingClass())(this._params.routes);
    },

    _handleRequest : function(req, res) {
        var route = this._router.dispatch(req);

        logger.debug('Route dispatched %j', route);

        return this.handleRequest(req, res, route)
            .fail(function(err) {
                route.action = 'internal-error';
                route.params.error = err;
                return this.handleRequest(req, res, route);
            }.bind(this));
    },

    handleRequest : function(req, res, route) {
        return new this.__self._getViewClass()
            .create(route.action, req, res, route.path, route.params)
            ._run();
    },

    getDefaultParams : function() {
        return {
            routes : config.routes
        };
    }

}, {

    _getRoutingClass : function() {
        return Router;
    },

    _getViewClass : function() {
        return View;
    }

}));

});