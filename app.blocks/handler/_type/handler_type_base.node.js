App.BaseHandler = inherit(App.CommonHandler, {

    __constructor : function(params) {
        this._params = App.Util.merge(this._getDefaultParams(), params);

        this._routes = this.__self._parse(this._params.routes);

        // TODO: method, params
        this
            .addRoute({
                rule   : '/objects/{id}',
                action : 'objects',
                method : 'get',
                params : {
                    'new' : true,
                    'type' : ['one', 'two']
                }
            });
    },

    _getDefaultParams : function() {
        return {
            routes : App.Config.param('routes')
        };
    }

});