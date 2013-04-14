modules.require(['yana:view', 'yana:logger'], function(View, logger) {

View.decl({ block : 'internal-error', base : 'error' }, {

    render : function(ctx) {
        logger.debug('InternalError handler is running');

        return this._params.error.toString();
    }

});

});