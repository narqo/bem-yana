App.Request = (function() {

var url = require('url'),
    qs = require('querystring'),
    cookies = require('cookies');

return {
    parseUrl : function(req) {
        if(req._parsed)
            return req._parsed;

        req._parsed = url.parse(req.url);
        req.path = req._parsed.pathname;

        return req._parsed;
    },

    parseQS : function(req) {
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
};

}());