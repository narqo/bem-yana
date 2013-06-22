/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-view',
    ['yana-error_type_http', 'yana-util', 'yana-logger'],
    function(provide, HttpError, util, logger, View) {

View.decl({ name : 'internal-error', base : 'error' }, {

    __constructor : function() {
        this.__base.apply(this, arguments);
        this._error = this.params.error;
    },

    render : function(ctx) {
        logger.debug('"%s" handler is running', this._getName());
        return this._error;
    }

});

provide(View);

});