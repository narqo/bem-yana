Yana.Handler = inherit({

    __constructor : function() {
    },

    run : function() {
        return this._handleRequest.bind(this);
    },

    _handleRequest : function(req, res) {
        return this.handleRequest(req, res);
    },

    handleRequest : function(req, res) {
        throw new Yana.Error('Not implemented');
    }

});