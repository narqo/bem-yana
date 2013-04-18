/* jshint node:true */
/* global modules:false */

(function() {

var Vow = require('vow');

modules.define('vow', function(provide, prev) {

provide(typeof prev === 'undefined'? Vow : prev);

});

}());
