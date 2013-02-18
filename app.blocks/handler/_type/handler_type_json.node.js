App.JsonHandler = inherit(App.Handler, {

    // TODO
    /*
    _handleRequest : function(req, res) {
        this.__base();

    },
    */

    handleRequest : function(req, res, route) {
        if(route.params._mode === 'json')
            res.setHeader('Content-Type', 'application/json');

        this.__base.apply(this, arguments);
    }

});