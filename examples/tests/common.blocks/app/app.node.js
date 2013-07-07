modules.define('app', ['yana-http', 'yana-handler'], function(provide, Http, RequestHandler) {

var app = new Http({ handlers : [ RequestHandler ] });

provide(app.run.bind(app));

});
