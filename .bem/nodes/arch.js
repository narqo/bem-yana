var PATH = require('path'),
    GLOBAL_ROOT_NAME = '__root_level_dir';

// FIXME: подумать, как обойтись без `env`
process.env[GLOBAL_ROOT_NAME] ||
    (process.env[GLOBAL_ROOT_NAME] = PATH.dirname(__dirname));


var environ = require('../environ'),
    registry = require('bem/lib/nodesregistry');

registry.decl('Arch', {

    /**
     * Задает список необходимых библиотек
     * @param {Array} libs Массив идентификаторов необходимых библиотек
     * @return {Object}
     */
    useLibraries : function(libs) {

        // список изветсных библиотек блоков
        var repo = environ.getConf().libraries,
            getLibRelPath = environ.getLibRelPath;

        return libs.reduce(function(enabled, lib) {

            if(repo[lib] == null)
                throw new Error('Library ' + lib + ' is not registered!');

            enabled[getLibRelPath(lib)] = repo[lib];
            return enabled;

        }, {});

    },

    /**
     * @returns {Object}
     * @override
     */
    getLibraries : function() {

        var libs = this.libraries;
        return Array.isArray(libs)?
                this.useLibraries(libs) : libs;

    },

    /**
     * @returns {Array}
     * @override
     */
    createBlockLibrariesNodes : function() {

        var libs = this.__base.apply(this, arguments),
            libsNodeName = environ.LIB_DIR;

        if(libsNodeName && libsNodeName !== '.') {
            var node = new (registry.getNodeClass('Node'))(libsNodeName);
            this.arch.setNode(node, null, libs);
        }

        return libs;

    }

});
