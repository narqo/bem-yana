App.Http = inherit({

    __constructor : function(params) {
        this._handlers = [];

        this._params = App.Util.merge(this._getDefaultParams() || params);

        this
            ._loadHandlers()
            ._createServer();
    },

    run : function(port) {
        port || (port = App.Config.param('NODE').port);

        this._server.listen(port, function() {
            App.Logger.info('Server started on %d', port);
        });
    },

    stop : function() {
        App.Logger.debug('Server was stoped');
        this._server.close();
    },

    _handlers : [],

    _loadHandlers: function() {
        this._handlers = this._params['handlers'];
        return this;
    },

    _onRequest : function(req, res) {
        App.Logger.debug('\nRequest for "%s" received', req.url);

        var stack = this._handlers,
            resP = [],
            handler,
            result;

        for(var i = 0; i < stack.length; i++) {
            if(res.finished) {
                App.Logger.debug('Response was finished before all the handlers processed!');
                // FIXME: do something usefull?
                return;
            }

            try {
                handler = (new stack[i]()).run();
                result = handler(req, res);

                Vow.isPromise(result) && resP.push(result);
            } catch(e) {
                this._onError(req, res, e);
                return;
            }

            resP.length &&
                Vow.all(resP)
                    .then(this._onStackEnd.bind(this, req, res), this._onError.bind(this, req, res));
        }
    },

    _onError : function(req, res, err) {
        App.Logger.debug('Error catched', err);

        var code = err.code || 500;

        res.writeHead(code, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.stack || err.toString());
    },

    _onStackEnd : function(req, res) {
        App.Logger.debug('All request handlers are passed');

        // XXX: should we really need this?
        res.finished || res.end();
    },

    _createServer : function() {
        this._server ||
            (this._server = this.__self._http.createServer(this._onRequest.bind(this)));
    },

    // TOOD
    _getDefaultParams : function() {
        return {
            'handlers' : App.Config.param('REQUEST_HANDLERS')
        };
    }

}, {

    _http : require('http')

});
