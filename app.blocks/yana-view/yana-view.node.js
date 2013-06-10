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
        this._params = util.extend(this.getDefaultParams(), params);
    },

    createContext : function() {},

    render : function() {},

    _getName : function() {
        return this.__self.getName();
    },

    _run : function() {
        logger.debug('Page for action: "%s", path: "%s" running',
                this._getName(), this._path);

        var ctx = this.createContext();

        return Vow.when(this.render.call(this, ctx))
            .then(this._onCompleted, this._onFailed, this);
    },

    _onCompleted : function(result) {
        if(this._res.finished) {
            logger.debug('Request for action "%s" was already processed', this._getName());
            return;
        }

        logger.debug('Request for action "%s" processed.', this._getName());

        var resultType = typeof result;

        // result should be Buffer or String
        result = resultType === 'undefined'? '' :
            (resultType === 'string'?
                result :
                Buffer.isBuffer(result) || result.toString());

        this._res.end(result, 'utf-8');
    },

    _onFailed : function(e) {
        logger.debug('Request for action "%s" failed:', this._getName(), e);
        throw new HttpError(500, e);
    },

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
        typeof decl === 'string' && (decl = { block : decl });

        if(decl.base && !views[decl.base]) {
            throw new ViewError(
                    util.format('No base view "%s" registered for view "%s"', decl.base, decl.block));
        }

        var base = views[decl.base] || views['yana-view'] || View;

        (views[decl.block] = inherit(base, props, staticProps))._name = decl.block;

        return this;
    },

    create : function(name, req, res, path, params) {
        if(!views[name]) {
            throw new ViewError('View is not registered "' + name + '"');
        }
        return new views[name](req, res, path, params);
    }

});

provide(View.decl('yana-view', {

    render : function(ctx) {
        logger.debug('Rendering request');
        return Vow.fulfill('Done!');
    }

}));

});