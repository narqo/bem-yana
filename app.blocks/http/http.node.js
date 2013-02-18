App.Http = inherit({

    __constructor : function() {
        this._stack = [];

        this._params = this._getDefaultParams();

        this
            ._loadMiddlewares()
            ._createServer();
    },

    start : function(port) {
        App.Logger.log('Server started on port %d', port);
        this._server.listen(port);
    },

    stop : function() {
        // TODO?
    },

    _stack : [],

    _loadMiddlewares : function() {
        this._stack = this._params['handlers'];
        return this;
    },

    _onRequest : function(req, res) {
        App.Logger.log('\nRequest for "%s" received', req.url);

        var stack = this._stack,
            resp = [];

        for(var i = 0; i < stack.length; i++) {
            if(res.finished) {
                App.Logger.log('Response was finished before all the handlers processed!');
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
        App.Logger.log('Error catched', err);

        var code = err.code || 500;

        res.writeHead(code, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.stack || err.toString());
    },

    _onStackEnd : function(req, res) {
        App.Logger.log('All request handlers are passed');
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
