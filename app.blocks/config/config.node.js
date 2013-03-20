Yana.Config = inherit({}, {

    param : function(name, val) {
        if(typeof val !== 'undefined') {
            this.__env[name] = val;
        }

        return this.__env[name];
    },

    params : function(params) {
        var env = this.__env;

        if(typeof params === 'undefined')
            return env;

        return this.__env = Yana.Util.merge(env, params);
    },

    __env : { }

});
