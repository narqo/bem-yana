/* jshint node:true */
/* global modules:false */

(function() {

var Vow = require('vow');

modules.define('promise', function(provide, prev) {

provide(typeof prev === 'undefined'? Vow : null);

});

}());
