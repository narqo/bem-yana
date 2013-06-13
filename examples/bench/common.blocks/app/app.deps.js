({
    mustDeps: [
        { block : 'modules' }
    ],
    shouldDeps : [
        { block : 'yana-http', mods : { domain : 'yes' } },
        { block : 'yana-cluster' },
        { block : 'handler' },
        { elem : 'config' }
    ]
});