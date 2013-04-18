/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-view',
    ['yana-logger'],
    function(provide, logger, View) {

provide(View.decl({ block : 'internal-error', base : 'error' }, {

    render : function(ctx) {
        logger.debug('InternalError handler is running');
        throw HttpError(500);
    }

}));

});