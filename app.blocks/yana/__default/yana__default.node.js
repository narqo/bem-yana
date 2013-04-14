modules.define(
    'yana:config',
    function(provide, config) {

provide({

    debug : false,

    node : {
        port : 3001,
        socket : 'node.socket',
        workers : 1
    },

    /**
     * @type String
     */
    app_root : '',

    /**
     * @type String
     */
    static_root : '',

    /**
     * @type String
     */
    static_url : '/static/'

});

});