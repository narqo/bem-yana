modules.define(
    'yana-view',
    ['yana-router', 'yana-logger'],
    function(provide, router, logger, View) {

View.decl('internal-error', {

    render : function() {
        if(this._error && this._error.stack)
            return this._error.stack || this._error.message;

        return this.__base.apply(this, arguments);
    }

});

provide(View);

});