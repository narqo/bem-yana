({
    mustDeps: [
        { block : 'modules' }
    ],
    shouldDeps : [
        { block : 'yana-http', mods : { domain : 'yes' } },
        { block : 'handler' },
        { elem : 'config' }
    ]
});