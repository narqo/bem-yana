Yana.View.decl({ block : 'method-not-allowed', base : 'error' }, {

    render : function() {
        Yana.Logger.debug('Method not allowed: "%s"', this._path);
        throw new Yana.HttpError(405);
    }

});
