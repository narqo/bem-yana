modules.define(
    'yana-view',
    ['yana-logger'],
    function(provide, logger, View) {

View.decl({ name : 'page-redirect', base : 'page' }, {

    render : function() {
        logger.debug('"%s" view should redirect to "/albums" with status code 302', this._getName());
        this.res.redirect('/albums');
    }

});

provide(View);

});

