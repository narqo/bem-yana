/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-view',
    ['inherit', 'vow', 'yana-util', 'yana-logger', 'yana-error_type_http', 'yana-error_type_view'],
    function(provide, inherit, Vow, util, logger, HttpError, ViewError) {

var views = {};

var View = inherit({

    __constructor : function(req, res, path, params) {
        this._req = req;
        this._res = res;
        this._path = path;

        Object.defineProperties(this, {
            'req' : {
                get : function() { return this._req }
            },
            'res' : {
                get : function() { return this._res }
            },
            'path' : {
                get : function() { return this._path }
            }
        });

        this.params = util.extend(this.getDefaultParams(), params);
    },

    createContext : function(data) {},

    render : function(ctx) {},

    _getName : function() {
        return this.__self.getName();
    },

    _run : function(data) {
        logger.debug('Page for action: "%s", path: "%s" running',
                this._getName(), this.path);

        var ctx = this.createContext(data);
        return Vow.invoke(this.render.bind(this), ctx)
            .then(this._onCompleted, this);
    },

    _onCompleted : function(result) {
        if(this.res.finished) {
            logger.debug('Request for path "%s" was already processed', this.path);
            return;
        }

        logger.debug('Request for action "%s" processed', this._getName());

        var resultType = typeof result;

        // result should be Buffer or String
        result = resultType === 'undefined'? '' :
            (resultType === 'string'?
                result :
                Buffer.isBuffer(result) || result.toString());

        this.res.end(result, 'utf-8');
    },

    /*_onFailed : function(e) {
        logger.debug('Request for action "%s" failed:', this._getName(), e);
        throw new HttpError(500, e);
    },*/

    getDefaultParams : function() {
        return {};
    }

}, {

    _name : '',

    views : views,

    getName : function() {
        return this._name;
    },

    decl : function(decl, props, staticProps) {
        typeof decl === 'string' && (decl = { name : decl });

        var base = decl.base;

        if(base && !views[base]) {
            throw new ViewError(
                    util.format('No base view "%s" registered for view "%s"', base, decl.name));
        }

        base = views[base || decl.name] || views['yana-view'] || this;

        (views[decl.name] = inherit(base, props, staticProps))._name = decl.name;

        return this;
    },

    /**
     * @param {String} name
     * @param {http#ServerRequest} req
     * @param {http#ServerResponse} res
     * @param {String} path
     * @param {Any} params
     * @param {Any} [...opts]
     * @returns {View}
     */
    create : function(name, req, res, path, params) {
        if(!views[name]) {
            throw new ViewError('View is not registered "' + name + '"');
        }
        return new (Function.prototype.bind.apply(views[name], arguments));
    }

});

View.decl('yana-view', {

    render : function() {
        logger.debug('Rendering request');
        return 'Done!';
    }

});

provide(View);

});