/* jshint node:true */
/* global modules:false */

modules.define('yana-view', ['yana-error_type_http'], function(provide, HttpError, View) {

provide(View.decl('error', {

    render : function() {
        throw new HttpError(500);
    }

}));

});
