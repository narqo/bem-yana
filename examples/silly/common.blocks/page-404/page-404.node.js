modules.define(
    'yana-view',
    ['yana-logger', 'yana-error_type_http'],
    function(provide, logger, HttpError, View) {

View.decl({ name : 'page-404', base : 'page' }, {

    render : function() {
        logger.debug('"%s" view should result with proper 404 statuses', this._getName());
        throw new HttpError(404, 'This view should result proper 404 page');
    }

});

provide(View);

});
