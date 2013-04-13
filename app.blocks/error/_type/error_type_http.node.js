/* jshint node:true */
/* global modules:false */

(function() {

var http = require('http');

modules.define(
    'yana:error_type_http',
    ['inherit', 'yana:error'],
    function(provide, inherit, YanaError) {

provide(inherit(YanaError, {

    __constructor : function(code, message) {
        this.code = code;
        this.message = message || http.STATUS_CODES[code];
    },

    toString : function() {
        return 'HttpError ' + this.code + ': ' + this.message;
    }

}));

});

}());