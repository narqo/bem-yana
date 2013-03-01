App.StaticFilesHandler = (function() {

var send = require('send');

return inherit(App.CommonHandler, {

    __constructor : function(params) {
        this._params = App.Util.merge(this._getDefaultParams(), params);
    },

    _handleRequest : function(req, res) {
        var _t = this,
            promise = Vow.promise(),
            path = App.Request.parseUrl(req).pathname;

        send(req, path)
            .maxage(this._params.maxAge || 0)
            .root(this._params.root)
//            .hidden(options.hidden)
//            .on('directory', directory)
            .on('error', function(err) {
                promise.reject(err);
            })
            .on('end', function() {
                console.log(arguments);
                promise.resolve(1);
            })
            .pipe(res);

        return promise;
    },

    handleErr : function(req, err) {
        if(err.status === 404)
            return this.handle404.call(this, req);
    },

    _getDefaultParams : function() {
        return {
            root : App.Config.param('application').staticRoot,
            maxAge : 0
        };
    }

});

}());