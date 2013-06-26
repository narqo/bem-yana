/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-response',
    ['yana-util', 'yana-logger'],
    function(provide, util, logger) {

var HTTP = require('http'),
    COOKIE = require('cookie');

provide({

    /* jshint proto:true */
    __proto__ : HTTP.ServerResponse.prototype,

    /**
     * @param {Number} [status=302]
     * @param {String} url
     */
    redirect : function(status, url) {
        if(typeof url === 'undefined') {
            url = status;
            status = 302;
        }

        logger.debug('Going to redirect to url "%s"', url);

        this.writeHead(status, { 'Location' : url });
        this.end();
    },

    /**
     * @param {String} name
     * @param {String} val
     * @param {Object} [opts]
     * @property {String} [opts.maxAge]
     * @property {String} [opts.domain]
     * @property {String} [opts.path='/']
     * @property {Number} [opts.expires]
     * @property {Boolean} [opts.httpOnly=false]
     * @property {Boolean} [opts.secure]
     */
    setCookie : function(name, val, opts) {
        opts = util.extend({}, opts);
        opts.path || (opts.path = '/');

        this.setHeader('set-cookie', COOKIE.serialize(name, '' + val, opts));
    },

    /**
     * @param {String} name
     * @param {Object} [opts]
     * @property {String} [opts.domain]
     * @property {String} [opts.path='/']
     */
    deleteCookie : function(name, opts) {
        var options = {
            expires : new Date(1),
            path    : '/'
        };

        this.setCookie(name, '', opts? util.extend(opts, options) : options);
    }

});

});
