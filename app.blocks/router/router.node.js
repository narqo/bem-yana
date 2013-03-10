Yana.Router = inherit({

    __constructor : function(routes) {
        this._rules = routes;
        this._routes = this.__self._parse(routes);
    },

    /**
     * @param {String} url
     * @returns {Object}
     */
    resolve : function(url) {
        url = this.__self._normalizeUrl(url);

        var routes = this._routes,
            max = routes.length - 1,
            route,
            m;

        Yana.Logger.debug('Going to route "%s"', url);

        while(route = routes[max--]) {
            if(m = route.regexp.exec(url)) {
                var params = {},
                    keys = route.keys,
                    len = keys.length;

                for(var i = 0; i < len; i++) {
                    params[ keys[i] ] = m[i+1];
                }

                return {
                    action : route.action,
                    path : url,
                    params : params
                };
            }
        }

        Yana.Logger.debug('No resource found for "%s"', url);
        return {
            action : this.__self.NOT_FOUND,
            path : url,
            params : {}
        };
    },

    dispatch : function(req) {
        var url = Yana.Request.parseUrl(req),
            resource = this.resolve(url.pathname);

        return resource;
    },

    addRoute : function(route) {
        this._routes.push(this.__self._parseRoute(route));
    },

    _routes : []

}, {

    NOT_FOUND : 'error404',

    STOPS : {
        COMMON : '[^/]+'
    },

    _parse : function(routes) {
        return routes.map(this._parseRoute, this);
    },

    _parseRoute : function(route) {
        var compiled = this._compile(route.rule);

        route.regexp = compiled.regexp;
        route.keys = compiled.keys;
        route.action = this._getRouteAction(route.action);

        return route;
    },

    _compile : function(rule) {
        var STOPS = this.STOPS,
            keys = [],
            path = rule.replace(/\{(.+?)\}/g, function(match, token) {
                var parts = token.split(':'),
                    typ = parts[1] || STOPS.COMMON;

                keys.push(parts[0]);

                return '(' + typ + ')';
            });

        path = '^' + path;
        ~path.indexOf('$') || (path += '$');

        return {
            regexp : new RegExp(path),
            keys : keys
        };
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
