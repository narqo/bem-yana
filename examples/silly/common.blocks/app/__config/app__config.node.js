modules.define(
    'yana-config',
    ['yana-util'],
    function(provide, util, config) {

var FS = require('fs');

provide(util.extend(config, {

    debug : true,

    app : {
        workers : 2,
        port : 3014
//        socket : '/tmp/bem-yana.sock'
    },

    logger : {
        level : 'debug'
//        file : FS.createWriteStream(__dirname + '/../../node.log', { flags : 'a' })
    }

}));

});
