modules.define(
    'yana-view',
    ['yana-router', 'yana-logger', 'yana-error_type_http'],
    function(provide, router, logger, HttpError, View) {

router.addRoute({
    name : '404',
    rule : '/404',
    data : { action : 'page-404' }
});

View.decl({ name : 'page-404' }, {

    render : function() {
        logger.info('"%s" view should result with proper 404 status', this._getName());
        throw new HttpError(404, 'This view will response with 404');
    }

});

provide(View);

});
