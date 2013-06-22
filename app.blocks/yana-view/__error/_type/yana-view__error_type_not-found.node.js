/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-view',
    ['yana-error_type_http', 'yana-logger'],
    function(provide, HttpError, logger, View) {

View.decl({ name : 'not-found', base : 'error' }, {

    render : function() {
        logger.debug('Path found: "%s"', this.path);
        throw new HttpError(404);
    }

});

provide(View);

});
