App.View = (function() {

var views = {};

var View = inherit({

    __constructor : function(req, res, path, params) {
        this._req = req;
        this._res = res;
        this._path = path;
        this._params = params;
    },

    render : function(ctx) {
        App.Logger.debug('Rendering request');
        return Vow.fulfill(1);
    },

    _getName : function() {
        return this.__self.getName();
    },

    _createContext : function() {},

    _run : function() {
        App.Logger.debug('Ω Page for action: "%s", path: "%s" running.',
                this._getName(), this._path);

        var ctx = this._createContext();

        return Vow.when(this.render.call(this, ctx))
            .then(this._onCompleted.bind(this), this._onFailed.bind(this))
            .done();
    },

    _onCompleted : function(result) {
        App.Logger.debug('Ω Request for action "%s" proccesed.', this._getName());

        var resultType = typeof result;

        // result should be Buffer or string
        result = resultType === 'undefined'? '' :
            (resultType === 'string'? result :
                Buffer.isBuffer(result) || result.toString());

        this._res.write(result, 'utf-8');
        this._res.end();
    },

    _onFailed : function(e) {
        App.Logger.debug('Ω Request for action "%s" failed with "%s".',
                this._getName(), e.message);

        throw new App.HttpError(500, e);
    }

}, {

    _name : '__super__',

    views : views,

    getName : function() {
        return this._name;
    },

    decl : function(decl, props, staticProps) {
        typeof decl === 'string' && (decl = { block : decl });

        if(decl.base && !views[decl.base]) {
            throw new App.ViewError(
                    App.Util.format('No base view "%s" registered for view "%s"', decl.base, decl.block));
        }

        var base = views[decl.base || decl.block] || this;

        (views[decl.block] = inherit(base, props, staticProps))._name = decl.block;
    },

    create : function(name, req, res, path, params) {
        if(!views[name]) {
            throw new App.ViewError('View is not registered "' + name + '"');
        }
        return new views[name](req, res, path, params);
    }

});

return View;

}());