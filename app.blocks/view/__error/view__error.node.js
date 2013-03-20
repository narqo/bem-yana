Yana.View.decl('error', {

    render : function() {
        throw new Yana.HttpError(500);
    }

});