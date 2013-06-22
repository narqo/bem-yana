modules.define(
    'yana-view',
    ['yana-logger', 'vow'],
    function(provide, logger, Vow, View) {

View.decl({ name : 'page-error', base : 'page' }, {

    render : function() {
        // @see http://bit.ly/135kxpO for "Preventing 'http: Raise hangup..' from crashing server"
        return Vow.delay(this.__base.apply(this, arguments), 5000);
    }

});

provide(View);

});