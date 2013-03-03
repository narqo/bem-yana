Yana.View.decl({ block : 'error404', base : 'error' }, {

    render : function() {
        Yana.Logger.debug('Not found: "%s"', this._path);
        throw new Yana.HttpError(404);
    }

});
