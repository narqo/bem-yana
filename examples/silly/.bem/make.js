/*global MAKE:true */

require('../../../.bem/nodes');

var path = require('path'),
    environ = require('../../../.bem/environ');


MAKE.decl('Arch', {

    bundlesLevelsRegexp : /^.+?\.bundles$/

});


MAKE.decl('BundleNode', {

    getTechs : function() {
        return [
            'bemdecl.js',
            'deps.js',
            'node.js'
        ];
    },

    getLevels : function() {
        return [
            '../../../common.blocks',
            '../../../app.blocks',
            '../common.blocks'
            ]
            .map(path.resolve.bind(null, __dirname));
    }

});
