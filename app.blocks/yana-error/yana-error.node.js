/* jshint node:true */
/* global modules:false */

modules.define('yana-error', ['inherit'], function(provide, inherit) {

provide(inherit(Error, {

    __constructor : function(message) {
        this.message = message;
    },

    toString : function() {
        return 'Error: ' + this.message;
    }

}));

});