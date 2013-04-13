modules.define(
    'yana:view__error_type_not-found',
    ['yana:view', 'yana:logger'],
    function(provide, View, logger) {

provide(View.decl({ block : 'not-found', base : 'error' }, {

    render : function() {
        logger.debug('Not found: "%s"', this._path);
        throw new HttpError(404);
    }

}));

});