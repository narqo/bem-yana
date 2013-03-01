App.View.decl('page', {

    _createContext : function() {
        return {
            request : this._req
        }
    },

    /**
     * @param {Object} ctx Context to render
     * @returns {String|Buffer}
     */
    render : function(ctx) {
        App.Logger.debug('Page handler is runnig');

        var req = ctx.request;

        return [req.method, req.path, JSON.stringify(req.query)].join('\n');
    }

});
