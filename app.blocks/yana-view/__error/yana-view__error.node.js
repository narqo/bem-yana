/* jshint node:true */
/* global modules:false */

modules.define('yana-view', ['yana-error_type_http'], function(provide, HttpError, View) {

View.decl('error', {

    render : function() {
        throw new HttpError(500);
    }

});

provide(View);

});
