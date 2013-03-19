Yana.Request = (function() {

var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    cookies = require('cookies');

return inherit(http.IncomingMessage, {

    __constructor : function(req) {
        req.__proto__ = this;

        req._normalize();
        return req;
    },

    _normalize : function() {
        if(this._normalized)
            return this;

        var _self = this.__self;

        _self.parseUrl(this);
        _self.parseArgs(this);
        _self.parseCookies(this);

        this._normalized = true;
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
    },

    hasBody : function(req) {
        return req.headers.hasOwnProperty('transfer-encoding') ||
            req.headers.hasOwnProperty('content-length');
    },

    parseBody : function(req) {
        var promise = Vow.promise(),
            body = {};

        if(req.method === 'POST' && this.hasBody(req)) {
            var buf = '';

            req.setEncoding('utf8');

            req
                .on('data', function(chunk) {
                    buf += chunk;
                })
                .once('end', function() {
                    try {
                        body = buf.length? qs.parse(buf) : {};
                        promise.fulfill(body);
                    } catch(e) {
                        promise.reject(e);
                    }
                })
                .once('close', function() {
                    promise.reject(new Yana.HttpError(500, 'connection closed'));
                });
        } else {
            promise.fulfill(body);
        }

        return promise;
    }

});

}());