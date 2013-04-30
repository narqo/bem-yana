/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-template',
    ['yana-config', 'yana-logger', 'vow'],
    function(provide, config, logger, Vow) {

var cache = {};

provide({

    /**
     * TODO config.cache.templates
     * @param {String} name
     */
    loadFromCache : function(name) {
        if(cache[name]) {
            logger.debug('Template "%s" cache hit', name);
            return cache[name];
        }
    },

    /**
     * NOTE: not implemented
     * @param {String} name
     */
    loadFromFs : function(name) {
        return cache[name] = '';
    },

    load : function(name) {
        var template;

        config.debug || (template = this.loadFromCache(name));
        template || (template = this.loadFromFs(name));

        return Vow.promise(template);
    },

    _cache : cache

});

});
