modules.define(
    'yana:view__error_type_method-not-allowed',
    ['yana:view', 'yana:logger'],
    function(provide, View, logger) {

provide(View.decl({ block : 'method-not-allowed', base : 'error' }, {

    render : function() {
        logger.debug('Method not allowed: "%s"', this._path);
        throw new HttpError(405);
    }

}));

});