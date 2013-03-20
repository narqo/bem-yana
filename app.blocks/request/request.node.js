Yana.Request = (function() {

var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    cookies = require('cookies');

return inherit(http.IncomingMessage, {

    /**
     * @constructor
     * @returns {Promise * Yana.Request}
     */
    __constructor : function(req) {
        req.__proto__ = this;

        return req._normalize();
    },

    _normalize : function() {
        if(this._normalized)
            return Vow.promise(this);

        var _self = this.__self;

        return _self.parseBody(this)
            .then(function(data) {

                this._bodyParser = dataParser(_self.parseDataType(this));
                this._rawBody = data;

                Object.defineProperty(this, 'body', {
                    'get' : function() {
                        if(this._body)
                            return this._body;

                        return this._body = this._bodyParser(this._rawBody);
                    },

                    'set' : function(val) {
                        return this._rawBody;
                    }
                });

                _self.parseUrl(this);
                _self.parseArgs(this);
                _self.parseCookies(this);

                this._normalized = true;

                return this;
            }.bind(this));
    },

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

    parseDataType : function(req) {
        var mime = this.parseMime(req);
        if('application/json' === mime)
            return 'json';
        return 'text';
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
                        buf.length || (buf = {});
                        promise.fulfill(buf);
                    } catch(e) {
                        promise.reject(new Yana.HttpError(400, e.message));
                    }
                })
                .once('close', function() {
                    promise.reject(new Yana.HttpError(500, 'connection closed'));
                });
        } else {
            promise.fulfill(body);
        }

        return promise;
    },

    hasBody : function(req) {
        return req.method === 'PUT' ||
            req.headers.hasOwnProperty('transfer-encoding') ||
            req.headers.hasOwnProperty('content-length');
    }

});


function dataParser(type) {
    switch(type) {

    case 'json':
        return JSON.parse;

    case 'text':
        return qs.parse;

    default:
        return function(data) { return data; };

    }
}


}());