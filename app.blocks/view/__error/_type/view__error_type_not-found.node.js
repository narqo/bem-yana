modules.require(
    ['yana:view', 'yana:error_type_http', 'yana:logger'],
    function(View, HttpError, logger) {

View.decl({ block : 'not-found', base : 'error' }, {

    render : function() {
        logger.debug('Not found: "%s"', this._path);
        throw new HttpError(404);
    }

});

});