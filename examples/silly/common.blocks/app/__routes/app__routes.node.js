modules.define('yana-router', function(provide, router) {

var routes = [
    {
        rule : '/',
        data : {
            action : 'page'
        }
    },
    {
        rule : '/albums',
        data : {
            action : 'page'
        }
    },
    {
        rule : '/albums/{id:\\d+}',
        data : {
            action : 'page'
        }
    },
    {
        rule : '/libs/{lib:bem\\-core}',
        data : {
            action : 'page'
        }
    }
];

routes.forEach(function(route) {
    router.addRoute(route);
});

provide(router);

});
