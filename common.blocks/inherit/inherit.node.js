/* jshint node:true */
/* global modules:false */

(function() {

var inherit = require('inherit');

modules.define('inherit', function(provide, prev) {

provide(typeof prev === 'undefined'? inherit : null);

});

}());