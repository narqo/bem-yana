modules.require(
    ['yana:view', 'yana:error_type_http'],
    function(View, HttpError) {

View.decl('error', {

    render : function() {
        throw new HttpError(500);
    }

});

});
