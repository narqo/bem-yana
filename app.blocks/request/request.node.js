Yana.Request = (function() {

var url = require('url'),
    qs = require('querystring'),
    cookies = require('cookies');

return inherit({

    __constructor : function(req) {
        return this._normalize(req);
    },

    _normalize : function(req) {
        if(req._normalized)
            return req;

        var _self = this.__self;

        _self.parseUrl(req);
        _self.parseArgs(req);
        _self.parseCookies(req);

        req._normalized = true;

        return req;
    }

}, {

    parseUrl : function(req) {
        if(req._parsed)
            return req._parsed;

        req._parsed = url.parse(req.url);
        req.path = req._parsed.pathname;

        return req._parsed;
    },

    parseArgs : function(req) {
        return req.query ||
            (req.query = ~req.url.indexOf('?')?
                 qs.parse(this.parseUrl(req).query) : {});
    },

    parseCookies : function(req) {
        return req.cookies ||
            (req.cookies =  new cookies(req));
    },

    parseMime : function(req) {
        var ct = req.headers['content-type'] || '';
        return ct.split(';')[0];
    }

});

}());