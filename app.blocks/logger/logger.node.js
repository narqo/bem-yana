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
        config.param('DEBUG') &&
            log.apply(null, arguments);
    },

    info  : log

});

});