/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-http',
    ['inherit', 'vow', 'yana-request', 'yana-response', 'yana-config', 'yana-logger', 'yana-util'],
    function(provide, inherit, Vow, Request, Response, config, logger, util) {

var FS = require('fs'),
    HTTP = require('http'),
    env = config.app;

provide(inherit({

    __constructor : function(params) {
        this._handlers = [];

        this._params = util.extend(this.getDefaultParams(), params);

        this._loadHandlers()
            ._createServer();
    },

    /**
     * @param {Numer|String} [portOrSocket]
     */
    run : function(portOrSocket) {
        portOrSocket || (portOrSocket = env.socket || env.port);

        this._server.listen(portOrSocket, function() {
            logger.info('Server started on %s "%s"',
                    typeof portOrSocket === 'number'? 'port' : 'socket', portOrSocket);

            if(isNaN(+portOrSocket)) {
                FS.chmod(portOrSocket, '0777');
            }
        });
    },

    stop : function() {
        logger.debug('Server stoped');
        this._server.close();
    },

    _handlers : [],

    _loadHandlers: function() {
        this._rqhandler = this._stackHandlers(this._params['handlers']);
        return this;
    },

    _stackHandlers : function(stack) {
        var proc;
        return stack.reduce(function(val, Handler) {
            proc = (new Handler())._run();

            return function(req, res) {
                // XXX: в Node.js все еще нет нативного способа определить,
                // что заголовки уже были отправленны
                if(res._header) {
                    logger.warning('Responce headers for request "%s" were sent already', req.url);
                    return;
                }

                if(res.finished) {
                    // FIXME: do something usefull?
                    logger.warning('Response for "%s" was finished before all the handlers processed!', req.url);
                    return;
                }

                // FIXME: в Node.js<0.10 события `data` и `end` эмитятся на первом event-loop'е,
                // поэтому завернуть обрабоку первого хендлера в промис, нельзя :(
                return val === null?
                    proc(req, res) :
                    Vow.when(val, function() {
                        return proc(req, res);
                    });
            };
        }, null);
    },

    _onRequest : function(req, res) {
        logger.debug('\nRequest for "%s" received', req.url);

        if(typeof this._rqhandler !== 'function') {
            logger.warning('No request handlers registered. Exiting');
            return this._onStackEnd(req, res);
        }

        Vow.all([this._serverRequest(req), this._serverResponse(res)])
            .spread(
                this._rqhandler,
                this._onStackEnd.bind(this, req, res),
                this._onError.bind(this, req, res))
            .done();
    },

    _onError : function(req, res, err) {
        logger.error('Error catched for "%s", %s.', req.url, err.message, err.stack || '');

        var code = err.code || 500;

        res.writeHead(code, {
            'Content-Type' : 'text/plain; charset=utf-8',
            'Connection' : 'close'
        });

        res.end(err.toString());
    },

    _onStackEnd : function(req, res) {
        logger.debug('All request handlers are passed');

        // `http#OutgoingMessage` internally checks for response to be finished,
        // so we might not worry about that.
        res.end();
    },

    _onClose : function() {
        logger.warning('Server closing');

        process.once('uncaughtException', function(e) {
            logger.error('Shutdown error', e);
        });

        // @see https://github.com/isaacs/npm-www/blob/master/worker.js
        // Race condition.  it's possible that we're closing because the
        // master did worker.disconnect(), in which case the IPC channel
        // will be in the process of closing right now.  give it a tick
        // to accomplish that.
        var t = setTimeout(function() {
            process.connected && process.disconnect();
        }, 100);

        process.on('disconnect', function() {
            clearTimeout(t);
        });
    },

    _serverRequest : function(req) {
        /* jshint proto:true */
        req.__proto__ = Request;
        return Vow.all([
                req.parseUrl(),
                req.parseArgs(),
                req.parseCookies(),
                req.parseBody()
            ])
            .then(function() {
                return req;
            });
    },

    _serverResponse : function(res) {
        /* jshint proto:true */
        res.__proto__ = Response;
        return res;
    },

    _createServer : function() {
        if(this._server) {
            logger.warning('It seems that server was already created. Returning');
            return this;
        }

        var server = this._server = HTTP.createServer();

        server.on('request', this._onRequest.bind(this));
        server.once('close', this._onClose.bind(this));

        return this;
    },

    getDefaultParams : function() {
        return {
            'handlers' : []
        };
    }

}));

});
