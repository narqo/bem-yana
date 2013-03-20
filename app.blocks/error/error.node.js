Yana.Error = inherit(Error, {

    __constructor : function(message) {
        this.message = message;
    },

    toString : function() {
        return 'Error: ' + this.message;
    }

});