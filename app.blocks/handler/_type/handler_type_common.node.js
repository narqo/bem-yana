Yana.CommonHandler = inherit(Yana.Handler, {

    __constructor : function() {
        this._params = this._getDefaultParams();

        this._router = new (this.__self._getRoutingClass())(this._params.routes);
    },

    _handleRequest : function(req, res) {
        var route = this._router.dispatch(req);

        Yana.Logger.debug('Route dispatched %j', route);

        return this.handleRequest(req, res, route);
    },

    handleRequest : function(req, res, route) {
        return new this.__self._getViewClass()
            .create(route.action, req, res, route.path, route.params)
            ._run();
    },

    _getDefaultParams : function() {
        return {
            routes : Yana.Config.param('routes')
        };
    }

}, {

    _getRoutingClass : function() {
        return Yana.Router;
    },

    _getViewClass : function() {
        return Yana.View;
    }

});
