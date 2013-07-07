/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-view',
    ['yana-error_type_http', 'yana-logger'],
    function(provide, HttpError, logger, View) {

View.decl({ name : 'not-allowed', base : 'error' }, {

    render : function() {
        logger.debug('Method not allowed: "%s"', this.path);
        throw new HttpError(405);
    }

});

provide(View);

});