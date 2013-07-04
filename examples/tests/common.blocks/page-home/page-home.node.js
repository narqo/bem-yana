modules.define(
    'yana-view',
    ['yana-router', 'yana-logger'],
    function(provide, router, logger, View) {

router.addRoute({
    name : 'home',
    rule : '/',
    data : { action : 'page-home' }
});

View.decl('page-home', {

    render : function() {
        logger.info('"%s" view is rendered', this._getName());
        return 'Welcome';
    }

});

provide(View);

});