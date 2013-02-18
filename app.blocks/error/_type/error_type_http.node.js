App.HttpError = inherit(App.Error, {

    __constructor : function(code, message) {
        this.code = code;
        this.message = message;
    },

    toString : function() {
        return 'HttpError ' + this.code + ': ' + this.message;
    }

});
