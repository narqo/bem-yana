modules.define(
    'yana:view__error_type_internal-error',
    ['yana:view'],
    function(provide, View) {

provide(View.decl({ block : 'internal-error', base : 'error' }, {

    render : function(ctx) {
        return this._params.error.toString();
    }

}));

});