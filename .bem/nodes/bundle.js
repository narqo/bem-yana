require('bem/lib/nodesregistry').decl('BundleNode', {

    'create-node.js-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});
