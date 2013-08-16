/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-logger',
    ['yana-config'],
    function(provide, config) {

var FS = require('fs'),
    Log = require('log'),
    cfg = config.logger,
    transport = cfg.file;

if(typeof transport === 'string') {
    transport = FS.createWriteStream(transport, { flags : 'a' });
}

provide(new Log(cfg.level, transport));

});
