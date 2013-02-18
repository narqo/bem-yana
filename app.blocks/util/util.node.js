App.Util = (function() {

var util = require('util'),
    AppUtil = {
        merge : function() {
            var res = {};

            for(var i = 0, len = arguments.length; i < len; i++) {
                var obj = arguments[i];
                if(obj) {
                    for(var name in obj) {
                        obj.hasOwnProperty(name) && (res[name] = obj[name]);
                    }
                }
            }

            return res;
        }
    };

return AppUtil.merge(util, AppUtil, {

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

});

}());
