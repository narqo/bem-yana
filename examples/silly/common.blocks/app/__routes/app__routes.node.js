modules.define('yana-router', function(provide, router) {

var routes = [
    {
        rule : '/',
        data : {
            action : 'page'
        }
    },
    {
        rule : '/alb',
        data : {
            action : 'page'
        },
        methods : ['post', 'get']
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
    },
    {
        rule : '/redirect',
        data : {
            action : 'page-redirect'
        }
    },
    {
        rule : '/leak',
        data : {
            action : 'page-error'
        }
    },
    {
        rule : '/404',
        data : {
            action : 'page-404'
        }
    }
];

routes.forEach(function(route) {
    router.addRoute(route);
});

provide(router);

});
