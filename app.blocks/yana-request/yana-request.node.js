/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-request',
    ['inherit', 'vow', 'yana-error', 'yana-error_type_http'],
    function(provide, inherit, Vow, YanaError, HttpError) {

var HTTP = require('http'),
    URL = require('url'),
    QS = require('querystring'),
    COOKIE = require('cookie');

function nopParser(data) {
    return data;
}

function jsonParser(data) {
    data = data.trim();

    if(!data.length) {
        throw new YanaError('json data is empty');
    }

    var firstChar = data.charAt(0);
    if(firstChar === '{' || firstChar === '[') {
        return JSON.parse(data);
    }

    throw new YanaError('invalid json');
}

function dataParser(type) {
    switch(type) {

    case 'json':
        return jsonParser;

    case 'text':
        return QS.parse;

    default:
        return nopParser;

    }
}

var Request = inherit({

    /**
     * @constructor
     * @returns {Promise * Request}
     */
    __constructor : function(req) {
        return this._normalize(req);
    },

    _normalize : function(req) {
        if(this._normalized) {
            return req;
        }

        var self = this.__self;

        self.parseUrl(req);
        self.parseArgs(req);
        self.parseCookies(req);

        return self.parseBody(req)
            .then(function(data) {
                req._body = data;

                try {
                    var parse = dataParser(self.parseDataType(req));
                    req.body = parse(data);
                } catch(e) {
                    throw new HttpError(400, e.message);
                }

                req._normalized = true;

                return req;
            });
    }

}, {

    parseUrl : function(req) {
        if(req._parsed) {
            return req._parsed;
        }

        req._parsed = URL.parse(req.url);
        req.path = req._parsed.pathname;

        return req._parsed;
    },

    parseArgs : function(req) {
        return req.query ||
            (req.query = req.url.indexOf('?') === -1?
                {} : QS.parse(this.parseUrl(req).query));
    },

    parseCookies : function(req) {
        if(req.cookies) {
            return req.cookies;
        }

        req.cookies = {};

        var cookies = req.headers.cookie;
        if(cookies) {
            req.cookies = COOKIE.parse(cookies);
        }

        return req.cookies;
    },

    parseMime : function(req) {
        var ct = req.headers['content-type'] || '';
        return ct.split(';')[0];
    },

    parseDataType : function(req) {
        var mime = this.parseMime(req);
        if('application/json' === mime) {
            return 'json';
        }
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
                    promise.fulfill(buf);
                })
                .once('close', function() {
                    promise.reject(new HttpError(500, 'connection closed'));
                });
        } else {
            promise.fulfill(body);
        }

        return promise;
    },

    hasBody : function(req) {
        return req.method === 'PUT' ||
            req.headers.hasOwnProperty('transfer-encoding') ||
            req.headers['content-length'] !== '0';
    }

});

provide(Request);

});
