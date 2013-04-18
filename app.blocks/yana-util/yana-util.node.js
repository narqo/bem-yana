/* jshint node:true */
/* global modules:false */

(function() {

var util = require('util');

modules.define('yana-util', function(provide) {

var appUtil = {
    extend : function(target) {
        typeof target !== 'object' && (target = {});

        for(var i = 1, len = arguments.length; i < len; i++) {
            var obj = arguments[i];
            if(obj) {
                for(var key in obj) {
                    obj.hasOwnProperty(key) && (target[key] = obj[key]);
                }
            }
        }

        return target;
    }
};

provide(
    appUtil.extend(util, appUtil, {

        unique : function(arr) {
            var res = [],
                i = arr.length;

            while(i--) {
                res.indexOf(arr[i]) < 0 && res.push(arr[i]);
            }

            return res;
        },

        isFunction : function(obj) {
            return toStr.call(obj) === '[object Function]';
        }

    })
);

});

}());
