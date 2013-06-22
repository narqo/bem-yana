/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-handler',
    ['inherit', 'vow', 'yana-request', 'yana-response', 'yana-error'],
    function(provide, inherit, Vow, Request, Response, YanaError) {

provide(inherit({

    /**
     * @protected
     * @returns {Function} Request handler
     */
    _run : function() {
        return this._init(this._handleRequest.bind(this));
    },

    /**
     * @private
     * @param {Function} handler
     * @returns {Function}
     */
    _init : function(handler) {
        var _t = this;
        return function(req, res) {
            _t._inited ||
                (_t._inited = Vow.all([_t._makeRequest(req), _t._makeResponse(res)]));

            return _t._inited.spread(function(req, res) {
                    return handler.call(_t, req, res);
                });
        };
    },

    /**
     * @protected
     * @param {Request} req
     * @param {Response} res
     * @returns {Any}
     */
    _handleRequest : function(req, res) {
        return this.handleRequest(req, res);
    },

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {...Any} [args]
     */
    handleRequest : function(req, res) {
        throw new YanaError('not implemented');
    },

    /**
     * Request object constructor
     * @param {http.ServerRequest} req
     * @returns {Promise * Request}
     */
    _makeRequest : function(req) {
        return new Request(req);
    },

    /**
     * Response object constructor
     * @param {http.ServerResponse} res
     * @returns {Response}
     */
    _makeResponse : function(res) {
        return new Response(res);
    }

}));

});