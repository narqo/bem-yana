module.exports = function(registry) {

    registry.decl('BundleNode', {

        'create-node.js-optimizer-node' : function(tech, sourceNode, bundleNode) {
            return this['create-js-optimizer-node'].apply(this, arguments);
        }

    });

};
