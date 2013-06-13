modules.define(
    'yana-view',
    ['yana-router'],
    function(provide, Router, View) {

Router.addRoute({
    name : 'document',
    rule : '/page',
    data : {
        action : 'page'
    }
});

View.decl('page', {

    /**
     * @param {Object} ctx Context to render
     * @returns {String|Buffer}
     */
    render : function(ctx) {
        return 'Page';
    }

});

provide(View);

});
