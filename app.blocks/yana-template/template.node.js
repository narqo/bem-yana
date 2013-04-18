/* jshint node:true */
/* global modules:false */

(function() {

var PATH = require('path'),
    VM = require('vm'),
    VowFS = require('vow-fs'),
    cache = {};

modules.define(
    'yana:template',
    ['inherit', 'promise', 'yana:util', 'yana:config', 'yana:logger'],
    function(provide, inherit, Vow, util, config, logger) {

provide({

    getPath : function(name, typ) {
        var path = config.bundles_root;
        return PATH.join(path, name, ['_', name, '.', typ].join(''));
    },

    /**
     * TODO config.cache.templates
     * @param {String} name
     */
    loadFromCache : function(name) {
        if(cache[name]) {
            logger.debug('Template "%s" cache hit', name);
            return Vow.promise(cache[name]);
        }
    },

    loadFromFs : function(name) {
        // TODO
    },

    load : function() {
        // TODO
    }

});

});

}());