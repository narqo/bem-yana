Yana.Handler = inherit({

    /**
     * @protected
     * @returns {Function} Request handler
     */
    _run : function() {
        return this._init.call(this, this._handleRequest.bind(this));
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
     * @param {Yana.Request} req
     * @param {Yana.Response} res
     * @returns {Any}
     */
    _handleRequest : function(req, res) {
        return this.handleRequest(req, res);
    },

    /**
     * @param {Yana.Request} req
     * @param {Yana.Response} res
     * @param {Any} [..args]
     */
    handleRequest : function(req, res) {
        throw new Yana.Error('not implemented');
    },

    /**
     * Request object constructor
     * @param {http.ServerRequest} req
     * @returns {Yana.Request}
     */
    _makeRequest : function(req) {
        var YRequest = Yana.Request,
            yreq = new YRequest(req);

        return YRequest.parseBody(req)
            .then(function(body) {
                yreq.body = body;
                return yreq;
            });
    },

    /**
     * Response object constructor
     * @param {http.ServerResponse} res
     * @returns {Yana.Response}
     */
    _makeResponse : function(res) {
        return new Yana.Response(res);
    }

});