(function() {

var config = App.Config,
    fileServer = require('node-static').Server;

App.View.decl('static', {

    __constructor : function() {
        this.__base.apply(this, arguments);

        this._root = config.param('STATIC_ROOT');
        this._pathUrl = config.param('STATIC_URL');

        this._pathUrlRe = new RegExp('^' + this._pathUrl + '/');

        this._server = new fileServer(this._root, { cache : false });
    },

    _run : function() {
        var promise = Vow.promise();

        var _t = this,
            pathname = this._path.replace(this._pathUrlRe, '');

        if(!pathname)
            return;

        App.Logger.debug('Going to serve static path "%s"', this._server.resolve(pathname));

        var status = 200;

        this._server.servePath(pathname, status, {}, this._req, this._res, function(status, res) {
            if(status > 400) {
                promise.reject(new App.HttpError(status));
                return;
            }

            // XXX: ugly
            _t._res.writeHead(status, res)

            promise.fulfill(res);
        });

        return promise;
    }

}, {

    _server : fileServer

});

}());
