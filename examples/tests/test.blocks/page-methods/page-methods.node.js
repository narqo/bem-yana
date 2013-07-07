modules.define(
    'yana-view',
    ['yana-router', 'yana-logger'],
    function(provide, router, logger, View) {

router.addRoute({
    name : 'get',
    rule : '/get',
    methods : ['get'],
    data : { action : 'page-get' }
});

router.addRoute({
    name : 'post',
    rule : '/post',
    methods : ['post'],
    data : { action : 'page-post' }
});

router.addRoute({
    name : 'methods',
    rule : '/methods',
    methods : ['get', 'post'],
    data : { action : 'page-methods' }
});

View.decl('method', {

    _getAccessibleMethod : function() {
        var name = this._getName();
        return name.substr(5).toUpperCase();
    },

    render : function() {
        logger.info('"%s" view migth be accessible only with "%s" method',
            this._getName(), this._getAccessibleMethod());
        return 'Hello, astronaut!';
    }

});

View.decl({ name : 'page-get', base : 'method' });
View.decl({ name : 'page-post', base : 'method' });

View.decl({ name : 'page-methods', base : 'method' }, {

    _getAccessibleMethod : function() {
        return "GET and POST";
    }

});

provide(View);

});