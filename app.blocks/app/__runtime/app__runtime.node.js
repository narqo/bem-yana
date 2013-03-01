App.Config.params({

    DEBUG : true,

    REQUEST_HANDLERS : [ App.BaseHandler ],

    NODE : {
        port : 3001,
        socket : require('path').join('www-root', '.bem/node.socket')
    },

    /**
     * @type String
     */
    APP_ROOT : '',
    /**
     * @type String
     */
    STATIC_ROOT : '',
    /**
     * @type String
     */
    STATIC_URL : '/static/'

});
