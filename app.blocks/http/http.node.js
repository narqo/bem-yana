App.Http = inherit({

    __constructor : function(params) {
        this._stack = [];

        this._params = App.Util.merge(this._getDefaultParams() || params);

        this
            ._loadMiddlewares()
            ._createServer();
    },

    run : function(port) {
        App.Logger.debug('Server started on %d', port);
        this._server.listen(port);
    },

    stop : function() {
        App.Logger.debug('Server was stoped');
        this._server.close();
    },

    _stack : [],

    _loadMiddlewares : function() {
        this._stack = this._params['handlers'];
        return this;
    },

    _onRequest : function(req, res) {
        App.Logger.debug('\nRequest for "%s" received', req.url);

        var stack = this._stack,
            resp = [];

        for(var i = 0; i < stack.length; i++) {
            if(res.finished) {
                App.Logger.debug('Response was finished before all the handlers processed!');
                // FIXME: do something usefull?
                return;
            }

            try {
                var handler = (new stack[i]()).run();
                resp.push(handler(req, res));
            } catch(e) {
                this._onError(req, res, e);
                return;
            }

            Vow.all(resp)
                .then(this._onStackEnd.bind(this, req, res));
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
    },

    _createServer : function() {
        this._server ||
            (this._server = this.__self._http.createServer(this._onRequest.bind(this)));
    },

    // TOOD
    _getDefaultParams : function() {
        return {
            'handlers' : App.Config.param('handlers')
        };
    }

}, {

    _http : require('http')

});
