/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-error_type_view',
    ['inherit', 'yana-error'],
    function(provide, inherit, YanaError) {

provide(inherit(YanaError, {

    toString : function() {
        return 'ViewError ' + this.message;
    }

}));

});