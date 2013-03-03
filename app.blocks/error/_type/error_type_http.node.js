(function() {

var http = require('http');

Yana.HttpError = inherit(Yana.Error, {

    __constructor : function(code, message) {
        this.code = code;
        this.message = http.STATUS_CODES[code];
    },

    toString : function() {
        return 'HttpError ' + this.code + ': ' + this.message;
    }

});

}());