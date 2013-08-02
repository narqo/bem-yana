/*global MAKE:true */

var environ = require('bem-environ')(__dirname),
    nodes = require('./nodes');

environ.extendMake(MAKE);
nodes.extendMake(MAKE);

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,
    bundlesLevelsRegexp : /^.+?\.bundles$/

});


MAKE.decl('BundleNode', {

    getTechs : function() {
        return [
            'bemdecl.js',
            'deps.js',
            'node.js'
        ];
    }

});
