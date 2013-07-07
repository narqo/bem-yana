/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-logger',
    ['yana-util', 'yana-config'],
    function(provide, util, config) {

var Log = require('log'),
    cfg = config.logger;

provide(new Log(cfg.level, cfg.transport));

});
