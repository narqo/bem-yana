modules.define(
    'yana-view',
    ['yana-router', 'yana-logger', 'vow'],
    function(provide, router, logger, Vow, View) {

router.addRoute({
    name : 'leak',
    rule : '/leak',
    data : { action : 'page-leak' }
});

View.decl({ name : 'page-leak' }, {

    render : function() {
        // TODO: write propper description for this test
        // @see http://bit.ly/135kxpO for "Preventing 'http: Raise hangup..' from crashing server"
        return Vow.delay(this.__base.apply(this, arguments), 5000);
    }

});

provide(View);

});