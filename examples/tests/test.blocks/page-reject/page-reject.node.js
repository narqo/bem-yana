modules.define(
    'yana-view',
    ['yana-router', 'yana-logger', 'vow'],
    function(provide, router, logger, Vow, View) {

router.addRoute({
    name : 'reject',
    rule : '/reject',
    data : { action : 'page-reject' }
});

View.decl({ name : 'page-reject' }, {

    render : function() {
        logger.info('"%s" view should result with proper error handler', this._getName());
        return Vow.reject(new Error('[reject] Something happened!'));
    }

});

provide(View);

});