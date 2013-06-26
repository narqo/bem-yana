/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-request',
    ['vow', 'yana-error', 'yana-error_type_http'],
    function(provide, Vow, YanaError, HttpError) {

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

var Request = {

    /* jshint proto:true */
    __proto__ : HTTP.IncomingMessage.prototype,

    parseUrl : function() {
        if(this._parsed) {
            return this._parsed;
        }

        this._parsed = URL.parse(this.url);
        this.path = this._parsed.pathname;

        return this._parsed;
    },

    parseArgs : function() {
        return this.query ||
            (this.query = this.url.indexOf('?') === -1?
                {} : QS.parse(this.parseUrl().query));
    },

    parseCookies : function() {
        if(this.cookies) {
            return this.cookies;
        }

        this.cookies = {};

        var cookies = this.headers.cookie;
        if(cookies) {
            this.cookies = COOKIE.parse(cookies);
        }

        return this.cookies;
    },

    parseMime : function() {
        var ct = this.headers['content-type'] || '';
        return ct.split(';')[0];
    },

    parseDataType : function() {
        var mime = this.parseMime();
        if('application/json' === mime) {
            return 'json';
        }
        return 'text';
    },

    parseBody : function() {
        var promise = Vow.promise(),
            req = this,
            body = {};

        if(req.method === 'POST' && this.hasBody()) {
            var buf = '';

            req.setEncoding('utf8');

            req
                .on('data', function(chunk) {
                    buf += chunk;
                })
                .once('end', function() {
                    promise.fulfill(req._rawBody = buf);
                })
                .once('close', function() {
                    promise.reject(new HttpError(500, 'connection closed'));
                });
        } else {
            promise.fulfill(req._rawBody = body);
        }

        return promise;
    },

    hasBody : function() {
        return this.method === 'PUT' ||
            this.headers.hasOwnProperty('transfer-encoding') ||
            this.headers['content-length'] !== '0';
    }

};

Object.defineProperty(Request, 'body', {
    get : function() {
        if(this._body) {
            return this._body;
        }

        try {
            var parse = dataParser(Request.parseDataType(this));
            this._body = parse(this._rawBody);
        } catch(e) {
            throw new HttpError(400, e.message);
        }

        return this._body;
    },

    set : function() {
        return this._rawBody;
    }
});

provide(Request);

});
