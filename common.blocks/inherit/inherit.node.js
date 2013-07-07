/* jshint node:true */
/* global modules:false */

modules.define('inherit', function(provide, prev) {

var inherit = require('inherit');
provide(typeof prev === 'undefined'? inherit : prev);

});