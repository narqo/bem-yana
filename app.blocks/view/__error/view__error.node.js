modules.define(
    'yana:view__error',
    ['yana:view', 'yana:error_type_http'],
    function(provide, View, HttpError) {

provide(View.decl('error', {

    render : function() {
        throw new HttpError(500);
    }

}));

});
