/* global MAKE */

require('../../../.bem/nodes').extendMake(MAKE);
require('../../.bem/nodes').extendMake(MAKE);

MAKE.decl('BundleNode', {

    getLevels : function() {
        return this.__base.apply(this, arguments)
            .concat(require('path').join(this.root, 'test.blocks'));
    }

});