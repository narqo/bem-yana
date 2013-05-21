/* jshint node:true */
/* global modules:false */

modules.define('vow', function(provide, prev) {

provide(typeof prev === 'undefined'? require('vow') : prev);

});
