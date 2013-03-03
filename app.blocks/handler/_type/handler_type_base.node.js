Yana.BaseHandler = inherit(Yana.CommonHandler, {

    __constructor : function(params) {
        this._params = Yana.Util.merge(this._getDefaultParams(), params);

        this._routes = this.__self._parse(this._params.routes);
    },

    _getDefaultParams : function() {
        return {
            routes : Yana.Config.param('routes')
        };
    }

});