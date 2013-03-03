Yana.CommonHandler = inherit(Yana.Router, {

    run : function() {
        return this._handleRequest.bind(this);
    },

    _handleRequest : function(req, res) {
        req = new Yana.Request(req);

        var route = this.dispatch(req);

        Yana.Logger.debug('Route dispatched %j', route);

        return this.handleRequest.call(this, req, res, route);
    },

    handleRequest : function(req, res, route) {
        return this.__self._getViewClass()
            .create(route.action, req, res, route.path, route.params)
            ._run();
    }

}, {

    _getViewClass : function() {
        return Yana.View;
    }

});