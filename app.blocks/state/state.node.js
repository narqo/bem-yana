App.StateHandler = inherit({

    run : function() {
        return this._stateHandler.bind(this);
    },

    _stateHandler : function(req, res) {
        return this._parseCookies.apply(this, arguments);
    },

    _parseCookies : function(req, res) {
        return req.cookies ||
            (req.cookies =  new this.__self._cookies(req, res));
    }

}, {

    _cookies : require('cookies'),

    run : function() {
        return (new this()).run();
    }

});