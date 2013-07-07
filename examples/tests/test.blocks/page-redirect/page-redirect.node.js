modules.define(
    'yana-view',
    ['yana-router', 'yana-logger'],
    function(provide, router, logger, View) {

router.addRoute({
    name : 'redirect',
    rule : '/redirect',
    data : { action : 'page-redirect' }
});

View.decl({ name : 'page-redirect' }, {

    render : function() {
        logger.info('"%s" view should redirect to "/" with status code 302', this._getName());
        this.res.redirect('/');
    }

});

provide(View);

});
