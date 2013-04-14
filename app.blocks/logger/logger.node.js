/* jshint node:true */
/* global modules:false */

modules.define(
    'yana:logger',
    ['yana:util', 'yana:config'],
    function(provide, util, config) {

function log() {
    console.log(util.format.apply(null, arguments));
}

provide({

    debug : function() {
        config.debug &&
            log.apply(null, arguments);
    },

    info  : log

});

});