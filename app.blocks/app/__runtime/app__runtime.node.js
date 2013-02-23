App.Config.params({

    handlers : [ App.BaseHandler ],

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
