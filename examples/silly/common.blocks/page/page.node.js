Yana.View.decl('page', {

    _createContext : function() {
        return {
            request  : this._req,
            response : this._res
        };
    },

    /**
     * @param {Object} ctx Context to render
     * @returns {String|Buffer}
     */
    render : function(ctx) {
        Yana.Logger.debug('Page handler is runnig');

        var req = ctx.request,
            res = ctx.response,
            keys = ['method', 'path', 'query', 'body', 'cookies'];

        return keys.map(function(param) {
                var val = req[param];
                return typeof val === 'string'? val : JSON.stringify(val);
            })
            .join('\n');
    }

});
