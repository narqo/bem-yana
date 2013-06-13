var PATH = require('path'),
    registry = require('bem/lib/nodesregistry'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname);

registry.decl('BundleNode', {

    getTechs : function() {
        return [
            'bemdecl.js',
            'deps.js',
            'node.js'
        ];
    },

    getLevels : function() {
        var levels = [
                '../../../common.blocks',
                '../../../app.blocks'
            ].map(function(level) {
                return resolve(level);
            });

        return levels.concat(join(this.root, 'common.blocks'));
    }

});
