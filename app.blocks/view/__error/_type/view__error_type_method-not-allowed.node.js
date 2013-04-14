modules.require(
    ['yana:view', 'yana:error_type_http', 'yana:logger'],
    function(View, HttpError, logger) {

View.decl({ block : 'method-not-allowed', base : 'error' }, {

    render : function() {
        logger.debug('Method not allowed: "%s"', this._path);
        throw new HttpError(405);
    }

});

});