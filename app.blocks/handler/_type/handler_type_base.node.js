App.BaseHandler = inherit(App.CommonHandler, {

    __constructor : function(params) {
        this._params = App.Util.merge(this._getDefaultParams(), params);

        this._routes = this.__self._parse(this._params.routes);
    },

    _getDefaultParams : function() {
        return {
            routes : App.Config.param('routes')
        };
    }

});