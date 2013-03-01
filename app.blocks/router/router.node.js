App.Router = inherit({

    __constructor : function(routes) {
        this._routes = this.__self._parse(routes);
    },

    /**
     * @param {String} url
     * @returns {Object}
     */
    resolve : function(url) {
        url = this.__self._normalizeUrl(url);

        var routes = this._routes,
            max = routes.length,
            p = 0;

        App.Logger.debug('Going to route "%s"', url);

        for(p = 0; p < max; p++) {
            var route = routes[p],
                m;

            if(m = url.match(route.regexp)) {
                var params = m.splice(1);
                return {
                    action : route.action,
                    path : url,
                    params : params
                };
            }
        }

        App.Logger.debug('No resource found for "%s"', url);
        return {
            action : this.__self.NOT_FOUND,
            path : url,
            params : []
        };
    },

    dispatch : function(req) {
        var url = App.Request.parseUrl(req),
            resource = this.resolve(url.pathname);

        return resource;
    },

    addRoute : function(route) {
        this._routes.push(this.__self._parseRoute(route));
    },

    _routes : []

}, {

    NOT_FOUND : 'not-found',

    STOPS : {
        COMMON : '([^/]+)'
    },

    _parse : function(routes) {
        return routes.map(this._parseRoute, this);
    },

    _parseRoute : function(route) {
        route.regexp = this._compile(route.rule);
        route.action = this._getRouteAction(route.action);
        return route;
    },

    _compile : function(rule) {
        var STOPS = this.STOPS,
            path = rule.replace(/(\{.+?\})/g, function(match, token) {
                return STOPS.COMMON;
            });
        return new RegExp('^' + path + '$');
    },

    _getRouteAction : function(name) {
        return name;
    },

    _normalizeUrl : function(url) {
        if(url.length > 1 && url.slice(-1) === '/')
            return url.slice(0, -1);
        return url;
    }

});
