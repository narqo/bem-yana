App.CommonHandler = inherit(App.Router, {

    run : function() {
        return this._handleRequest.bind(this);
    },

    _normalizeRequest : function(req) {
        var url = App.Url;

        url.parse(req);
        url.query(req);
    },

    _handleRequest : function(req, res) {
        this._normalizeRequest(req);

        var route = this.dispatch(req);

        App.Logger.log('Route dispatched %j', route);

        if(route.action === App.Router.NOT_FOUND) {
            this.handle404.call(this, req, res, route);
            return;
        }

        return this.handleRequest.call(this, req, res, route);
    },

    handleRequest : function(req, res, route) {
        this.__self._getViewClass()
            .create(route.action, req, res, route.path, route.params)
            ._run();
    },

    handle404 : function(req, res, route) {
        App.Logger.log('Not found: "%s"', route.path);
        throw new App.HttpError(404, 'Not found.');
    },

    handle500 : function(req, res) {
        throw new App.HttpError(500, 'Temporarily unavailable.');
    }

}, {

    _getViewClass : function() {
        return App.View;
    }

});