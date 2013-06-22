modules.define('yana-handler', ['inherit'], function(provide, inherit, Handler) {

provide(inherit(Handler, {

    /** @override */
    _handleRequest : function(req, res) {
        if(req.url === '/hello') {
            res.setHeader('Content-Length', 5);
            res.end('Hello');
            return;
        }

        return this.__base.apply(this, arguments);
    },

    /** @override */
    handleRequest : function(req, res, route) {
        if(req.url === '/silly') {
            res.setHeader('Content-Length', 5);
            res.end('Silly');
            return;
        }

        return this.__base.apply(this, arguments);
    }

}));

});
