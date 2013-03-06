Yana.Http = inherit({

    __constructor : function(params) {
        this._handlers = [];

        this._params = Yana.Util.merge(this._getDefaultParams(), params);

        this
            ._loadHandlers()
            ._createServer();
    },

    run : function(port) {
        port || (port = Yana.Config.param('NODE').port);

        this._server.listen(port, function() {
            Yana.Logger.info('Server started on %d', port);
        });
    },

    stop : function() {
        Yana.Logger.debug('Server was stoped');
        this._server.close();
    },

    _handlers : [],

    _loadHandlers: function() {
        this._handlers = this._params['handlers'];
        return this;
    },

    _onRequest : function(req, res) {
        Yana.Logger.debug('\nRequest for "%s" received', req.url);

        var stack = this._handlers,
            hResultsP = [],
            result,
            handler;

        for(var i = 0; i < stack.length; i++) {
            try {
                handler = (new stack[i]()).run();

                (function(req, res, handler) {

                    result = Vow.when(result || true, function() {
                        if(res.finished) {
                            Yana.Logger.debug('Response was finished before all the handlers processed!');
                            // FIXME: do something usefull?
                            return;
                        }

                        return handler(req, res);
                    });

                    hResultsP.push(result);

                }).call(this, req, res, handler);

            } catch(e) {
                this._onError(req, res, e);
                return;
            }

        }

        Vow.all(hResultsP).then(
            this._onStackEnd.bind(this, req, res),
            this._onError.bind(this, req, res));
    },

    _onError : function(req, res, err) {
        Yana.Logger.debug('Error catched', err);

        var code = err.code || 500;

        res.writeHead(code, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.stack || err.toString());
    },

    _onStackEnd : function(req, res) {
        Yana.Logger.debug('All request handlers are passed');

        // XXX: should we really need this?
        res.finished || res.end();
    },

    _createServer : function() {
        this._server ||
            (this._server = this.__self._http.createServer(this._onRequest.bind(this)));
    },

    _getDefaultParams : function() {
        return {
            'handlers' : [ Yana.CommonHandler ]
        };
    }

}, {

    _http : require('http')

});
