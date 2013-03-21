Yana.Response = (function() {

var http = require('http'),
    cookie = require('cookie'),
    logger = Yana.Logger;

return inherit(http.ServerResponse, {

    __constructor : function(res) {
        res.__proto__ = this;

        return res;
    },

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
     * TODO: Подумать о том, чтобы выставлять cookie балком при `res.end()`
     *
     * @param {String} name
     * @param {String} val
     * @param {Object} [opts]
     * @param {String} [opts.maxAge]
     * @param {String} [opts.domain]
     * @param {String} [opts.path='/']
     * @param {Number} [opts.expires]
     * @param {Boolean} [opts.httpOnly=false]
     * @param {Boolean} [opts.secure]
     */
    setCookie : function(name, val, opts) {
        opts = Yana.Util.merge({}, opts);
        opts.path || (opts.path = '/');

        this.setHeader('Set-Cookie', cookie.serialize(name, '' + val, opts));
    },

    /**
     * @param {Stirng} name
     * @param {Object} [opts]
     * @param {String} [opts.domain]
     * @param {String} [opts.path='/']
     */
    deleteCookie : function(name, opts) {
        var options = {
            expires : new Date(1),
            path    : '/'
        };

        this.setCookie(name, '', opts? Yana.Util.merge(opts, options) : options);
    }

});

}());