/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-view',
    ['yana-error_type_http', 'yana-logger'],
    function(provide, HttpError, logger, View) {

provide(View.decl({ block : 'not-found', base : 'error' }, {

    render : function() {
        logger.debug('Not found: "%s"', this._path);
        throw new HttpError(404);
    }

}));

});