Yana.ViewError = inherit(Yana.Error, {

    toString : function() {
        return 'ViewError ' + this.message;
    }

});