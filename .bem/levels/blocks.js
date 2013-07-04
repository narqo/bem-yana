var PATH = require('path'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    PRJ_TECHS = resolve('../techs/');

exports.getTechs = function() {

    return {
        'bemdecl.js'    : 'bemdecl.js',
        'deps.js'       : 'deps.js',
        'js'            : 'js-i',
        'node.js'       : join(PRJ_TECHS, 'node.js')
    };

};

exports.defaultTechs = ['node.js', 'deps.js'];
