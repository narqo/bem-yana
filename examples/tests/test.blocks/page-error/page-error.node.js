modules.define(
    'yana-view',
    ['yana-router', 'yana-logger', 'vow'],
    function(provide, router, logger, Vow, View) {

router.addRoute({
    name : 'error',
    rule : '/error',
    data : { action : 'page-error' }
});

View.decl({ name : 'page-error' }, {

    render : function() {
        logger.info('"%s" view should result with proper error handler', this._getName());
        return Vow.reject(new Error('Something happened!'));
    }

});

provide(View);

});