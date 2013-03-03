Yana.Config.params({

    DEBUG : false,

    REQUEST_HANDLERS : [ Yana.BaseHandler ],

    NODE : {
        port : 3001,
        socket : 'node.socket'
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
