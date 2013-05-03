modules.define('yana-router', function(provide, router) {

var routes = [
    { rule : '/', action : 'page' },
    { rule : '/alb', action : 'page', methods : ['post', 'get'] },
    { rule : '/albums', action : 'page' },
    { rule : '/albums/{id:\\d+}', action : 'page' },
    { rule : '/libs/{lib:bem\-core}', action : 'page' },
    { rule : '/m', action : 'static' },
    { rule : '/.*\\.js$', action : 'static' },
    { rule : '/favicon.ico', action : 'static' }
];

routes.forEach(function(route) {
    router.addRoute(route);
});

provide(router);

});