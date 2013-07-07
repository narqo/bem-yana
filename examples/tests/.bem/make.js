/* global MAKE */

require('../../../.bem/nodes');
require('../../.bem/nodes');

MAKE.decl('BundleNode', {

    getLevels : function() {
        return this.__base.apply(this, arguments)
            .concat(require('path').join(this.root, 'test.blocks'));
    }

});