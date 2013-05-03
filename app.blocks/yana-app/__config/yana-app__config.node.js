/* global modules:false */
/* jshint node:true */

modules.define('yana-config', ['yana-util'], function(provide, util, config) {

provide(util.extend(config, {

    debug : false,

    app : {
        root : '',
        port : 3001,
//        socket : 'node.socket',
        workers : 1
    },

    logger : {
        level : 'info'
    }

}));

});