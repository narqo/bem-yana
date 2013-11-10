var PATH = require('path');

exports.baseTechName = 'v2/js';
exports.techMixin = {

    getSuffixes : function() {
        return ['node.js'];
    },

    getBuildSuffixes : function() {
        return ['node.js'];
    },

    getBuildResultChunk : function(relPath) {
        // NOTE: module's path is always an UNIX path,
        // so `relPath` should be converted on Windows systems
        if(PATH.sep !== '/') {
            relPath = relPath.replace(/\\/g, '/');
        }
        // NOTE: Without a leading '/' or './' to indicate a file, the module is either
        // a "core module" or is loaded from a node_modules folder
        if(/^\w/.test(relPath)) {
            relPath = './' + relPath;
        }
        return 'require(\'' + relPath + '\');\n';
    }

};
