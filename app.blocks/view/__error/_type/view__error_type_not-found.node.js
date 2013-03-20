Yana.View.decl({ block : 'not-found', base : 'error' }, {

    render : function() {
        Yana.Logger.debug('Not found: "%s"', this._path);
        throw new Yana.HttpError(404);
    }

});
