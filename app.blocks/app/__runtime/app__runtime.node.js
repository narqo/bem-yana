App.Config.params({

    handlers : [ App.StateHandler, App.BaseHandler ],

    node : {
        port : 3001,
        socket : require('path').join('www-root', '.bem/node.socket')
    },

    application : {
        root : '',
        bundlesRoot : '',
        staticRoot : ''
    }

});
