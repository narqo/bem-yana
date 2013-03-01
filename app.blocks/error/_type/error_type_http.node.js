(function() {

var http = require('http');

App.HttpError = inherit(App.Error, {

    __constructor : function(code, message) {
        this.code = code;
        this.message = message || http.STATUS_CODES[code];
    },

    toString : function() {
        return 'HttpError ' + this.code + ': ' + this.message;
    }

});

}());