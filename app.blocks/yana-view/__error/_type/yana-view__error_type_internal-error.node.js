/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-view',
    ['yana-error_type_http', 'yana-logger'],
    function(provide, HttpError, logger, View) {

provide(View.decl({ block : 'internal-error', base : 'error' }, {

    render : function(ctx) {
        logger.debug('InternalError handler is running');
        return this._params.error;
    }

}));

});