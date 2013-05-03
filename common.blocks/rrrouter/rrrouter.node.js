/* jshint node:true */
/* global modules:false */

modules.define('rrrouter', ['inherit'], function(provide, inherit) {

provide(inherit({

    /**
     * @constructor
     * @param {Object} routes
     * @param {String} routes.rule
     * @param {String} routes.action
     * @param {Array} [routes.methods]
     */
    __constructor : function(routes) {
        if(!routes) {
            return;
        }

        this._rules = routes;
        this._routes = this.__self._parse(routes);
    },

    /**
     * @param {Object} route
     * @param {String} route.rule
     * @param {String} route.action
     * @param {Array} [route.methods]
     */
    addRoute : function(route) {
        this._rules.push(route);
        this._routes.push(this.__self._parseRoute(route));
    },

    /**
     * @param {String} url
     * @param {String} [method=GET]
     * @returns {Object}
     */
    resolve : function(url, method) {
        var self = this.__self;

        method || (method = self.DEFAULT_METHOD);

        url = self._normalizeUrl(url);

        var routes = this._routes,
            max = routes.length - 1,
            route,
            lastMatched,
            m;

        /* jshint boss:true */
        while(route = routes[max--]) {
            if(m = route.regexp.exec(url)) {
                lastMatched = route;

                if(route.methods.length && !~route.methods.indexOf(method))
                    continue;

                var params = {},
                    keys = route.keys,
                    len = keys.length;

                for(var i = 0; i < len; i++) {
                    params[ keys[i] ] = m[i+1];
                }

                return {
                    action : route.action,
                    path   : url,
                    method : method,
                    params : params
                };
            }
        }

        if(lastMatched) {
            return {
                action : self.NOT_ALLOWED,
                path   : url,
                method : method,
                params : {}
            };
        }

        return {
            action : self.NOT_FOUND,
            path   : url,
            method : method,
            params : {}
        };
    },

    // TODO
    reverse : function(action, method, params) {
    },

    /**
     * @param req
     * @returns {Object} Dispatched route declaration
     */
    /*
    dispatch : function(req) {
        var url = Request.parseUrl(req),
            resource = this.resolve(url.pathname, req.method.toUpperCase());
        return resource;
    },
    */

    _rules : [],
    _routes : []

}, {

    NOT_FOUND : 'not-found',

    NOT_ALLOWED : 'method-not-allowed',

    DEFAULT_METHOD : 'GET',

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
        route.methods = this._getRouteMethods(route.methods);

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

    _getRouteMethods : function(methods) {
        if(!Array.isArray(methods))
            return [];

        methods = methods.map(function(m) {
            return m.toUpperCase();
        });

        // XXX: автоматически добавлять HEAD в список методов, если есть GET
        if(methods.indexOf('HEAD') === -1 && methods.indexOf('GET') > -1) {
            methods.push('HEAD');
        }

        return methods;
    },

    _normalizeUrl : function(url) {
        if(url.length > 1 && url.slice(-1) === '/')
            return url.slice(0, -1);
        return url;
    }

}));

});
