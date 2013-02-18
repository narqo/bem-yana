App.ViewError = inherit(App.Error, {

    toString : function() {
        return 'ViewError: ' + this.message;
    }

});